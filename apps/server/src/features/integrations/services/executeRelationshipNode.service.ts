import type { IntegrationGraphDefinition, IntegrationGraphEdge } from "@monorepo/shared";
import type {
  ExecutableGraphNode,
  RelationshipGraphNode,
} from "./integrationWorkflowBuilder.service";

const DEFAULT_PORT = "__default__";

type ExecutableRelationshipNode = RelationshipGraphNode & ExecutableGraphNode;
type BufferedInputs = Map<string, unknown[]>;

function getBufferKey(handle?: string) {
  return handle ?? DEFAULT_PORT;
}

function ensureNodeBuffer(store: Map<string, BufferedInputs>, nodeId: string) {
  let bufferedInputs = store.get(nodeId);
  if (!bufferedInputs) {
    bufferedInputs = new Map<string, unknown[]>();
    store.set(nodeId, bufferedInputs);
  }

  return bufferedInputs;
}

function takeBufferedInput(
  store: Map<string, BufferedInputs>,
  nodeId: string,
  preferredHandles: string[]
) {
  const bufferedInputs = ensureNodeBuffer(store, nodeId);

  for (const handle of preferredHandles) {
    const values = bufferedInputs.get(handle);
    if (values && values.length > 0) {
      return values.shift();
    }
  }

  return undefined;
}

function peekBufferedInputs(store: Map<string, BufferedInputs>, nodeId: string, handle: string) {
  return ensureNodeBuffer(store, nodeId).get(handle) ?? [];
}

function consumeBufferedInputs(
  store: Map<string, BufferedInputs>,
  nodeId: string,
  handles: string[]
) {
  const bufferedInputs = ensureNodeBuffer(store, nodeId);

  return handles.map((handle) => {
    const values = bufferedInputs.get(handle) ?? [];
    return values.shift();
  });
}

function getIncomingEdges(graph: IntegrationGraphDefinition, nodeId: string) {
  return graph.edges.filter((edge) => edge.target === nodeId);
}

function getOutgoingEdges(graph: IntegrationGraphDefinition, nodeId: string) {
  return graph.edges.filter((edge) => edge.source === nodeId);
}

function getRelationshipRequiredHandles(
  node: ExecutableRelationshipNode,
  incomingEdges: IntegrationGraphEdge[]
) {
  switch (node.type) {
    case "joinAll":
      return (node.config.expectedPorts.length > 0
        ? node.config.expectedPorts
        : incomingEdges.map((edge) => getBufferKey(edge.targetHandle))
      ).map(getBufferKey);
    case "mergeAny":
      return (node.config.inputPorts.length > 0
        ? node.config.inputPorts
        : incomingEdges.map((edge) => getBufferKey(edge.targetHandle))
      ).map(getBufferKey);
    case "barrier":
      return (node.config.branches.length > 0
        ? node.config.branches
        : incomingEdges.map((edge) => getBufferKey(edge.targetHandle))
      ).map(getBufferKey);
    default:
      return incomingEdges.map((edge) => getBufferKey(edge.targetHandle));
  }
}

function reduceValues(
  values: unknown[],
  strategy: "sum" | "concat" | "merge" | "custom",
  initialValue?: unknown
) {
  switch (strategy) {
    case "sum":
      return values.reduce(
        (total, value) => Number(total) + Number(value ?? 0),
        Number(initialValue ?? 0)
      );
    case "concat":
      return values.reduce<string>(
        (result, value) => result + String(value ?? ""),
        String(initialValue ?? "")
      );
    case "merge":
      return values.reduce<Record<string, unknown>>((result, value) => {
        if (value && typeof value === "object" && !Array.isArray(value)) {
          return { ...result, ...(value as Record<string, unknown>) };
        }

        return result;
      }, (initialValue as Record<string, unknown>) ?? {});
    case "custom":
      return {
        initialValue,
        values,
      };
  }
}

export function executeRelationshipNode(
  node: ExecutableRelationshipNode,
  store: Map<string, BufferedInputs>,
  graph: IntegrationGraphDefinition
) {
  const incomingEdges = getIncomingEdges(graph, node.id);
  const requiredHandles = getRelationshipRequiredHandles(node, incomingEdges);

  switch (node.type) {
    case "passThrough": {
      const value = takeBufferedInput(store, node.id, requiredHandles.concat(DEFAULT_PORT));
      if (value === undefined) {
        return null;
      }

      return { out: [value] };
    }
    case "condition": {
      const value = takeBufferedInput(store, node.id, requiredHandles.concat(DEFAULT_PORT));
      if (value === undefined) {
        return null;
      }

      const result =
        typeof value === "boolean"
          ? value
          : Boolean(
              value &&
                typeof value === "object" &&
                "result" in (value as Record<string, unknown>)
                ? (value as Record<string, unknown>).result
                : value
            );

      return {
        [result ? "true" : "false"]: [value],
      };
    }
    case "fanOut": {
      const value = takeBufferedInput(store, node.id, requiredHandles.concat(DEFAULT_PORT));
      if (value === undefined) {
        return null;
      }

      const outputs =
        node.config.outputPorts.length > 0
          ? node.config.outputPorts
          : getOutgoingEdges(graph, node.id)
              .map((edge) => edge.sourceHandle)
              .filter((handle): handle is string => Boolean(handle));

      if (node.config.mode === "partition" && Array.isArray(value)) {
        return outputs.reduce<Record<string, unknown[]>>(
          (result: Record<string, unknown[]>, outputPort: string, index: number) => {
            result[outputPort] = value.filter(
              (_, itemIndex) => itemIndex % outputs.length === index
            );
            return result;
          },
          {}
        );
      }

      return outputs.reduce<Record<string, unknown[]>>(
        (result: Record<string, unknown[]>, outputPort: string) => {
          result[outputPort] = [value];
          return result;
        },
        {}
      );
    }
    case "joinAll": {
      const ready = requiredHandles.every(
        (handle) => peekBufferedInputs(store, node.id, handle).length > 0
      );
      if (!ready) {
        return null;
      }

      const values = consumeBufferedInputs(store, node.id, requiredHandles);
      const output =
        node.config.emitMode === "object"
          ? Object.fromEntries(
              requiredHandles.map((handle: string, index: number) => [
                handle,
                values[index],
              ])
            )
          : values;

      return { out: [output] };
    }
    case "mergeAny": {
      const handle = requiredHandles.find(
        (candidateHandle: string) =>
          peekBufferedInputs(store, node.id, candidateHandle).length > 0
      );

      if (!handle) {
        return null;
      }

      const value = takeBufferedInput(store, node.id, [handle]);
      if (value === undefined) {
        return null;
      }

      return { out: [value] };
    }
    case "collect": {
      const values = peekBufferedInputs(store, node.id, "in");
      if (values.length < node.config.count) {
        return null;
      }

      const collected = values.splice(0, node.config.count);
      return { out: [collected] };
    }
    case "map": {
      const value = takeBufferedInput(store, node.id, ["in", DEFAULT_PORT]);
      if (!Array.isArray(value)) {
        return value === undefined ? null : { item: [value] };
      }

      return {
        [node.config.itemPortId ?? "item"]: value,
      };
    }
    case "reduce": {
      const values = peekBufferedInputs(store, node.id, "in");
      const expectedCount = node.config.expectedCount ?? values.length;

      if (values.length < expectedCount || expectedCount === 0) {
        return null;
      }

      const toReduce = values.splice(0, expectedCount);
      return {
        out: [reduceValues(toReduce, node.config.strategy, node.config.initialValue)],
      };
    }
    case "barrier": {
      const ready = requiredHandles.every(
        (handle) => peekBufferedInputs(store, node.id, handle).length > 0
      );
      if (!ready) {
        return null;
      }

      const values = consumeBufferedInputs(store, node.id, requiredHandles);
      return {
        out: [
          Object.fromEntries(
            requiredHandles.map((handle: string, index: number) => [
              handle,
              values[index],
            ])
          ),
        ],
      };
    }
  }
}
