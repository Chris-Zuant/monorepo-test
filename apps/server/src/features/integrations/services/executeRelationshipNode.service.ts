import type { IntegrationGraphDefinition, IntegrationGraphEdge } from "@monorepo/shared";
import type * as activities from "../temporal/activities";
import type {
  ExecutableGraphNode,
  RelationshipGraphNode,
} from "./integrationWorkflowBuilder.service";
import {
  consumeBufferedInputs,
  DEFAULT_PORT,
  getBufferKey,
  peekBufferedInputs,
  takeBufferedInput,
  type BufferedNodeStore,
} from "./buffer.service";

type ExecutableRelationshipNode = RelationshipGraphNode & ExecutableGraphNode;

export type RelationshipActivityFns = Pick<
  typeof activities,
  | "conditionRelationshipActivity"
  | "fanOutRelationshipActivity"
  | "joinRelationshipActivity"
  | "collectRelationshipActivity"
  | "mapRelationshipActivity"
  | "reduceRelationshipActivity"
>;

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
    case "join":
      return (node.config.inputPorts.length > 0
        ? node.config.inputPorts
        : incomingEdges.map((edge) => getBufferKey(edge.targetHandle))
      ).map(getBufferKey);
    default:
      return incomingEdges.map((edge) => getBufferKey(edge.targetHandle));
  }
}

export async function executeRelationshipNode(
  node: ExecutableRelationshipNode,
  store: BufferedNodeStore,
  graph: IntegrationGraphDefinition,
  activityFns: RelationshipActivityFns
) {
  const incomingEdges = getIncomingEdges(graph, node.id);
  const requiredHandles = getRelationshipRequiredHandles(node, incomingEdges);

  switch (node.type) {
    case "condition": {
      const value = takeBufferedInput(store, node.id, requiredHandles.concat(DEFAULT_PORT));
      if (value === undefined) {
        return null;
      }

      return activityFns.conditionRelationshipActivity({ node, value });
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

      return activityFns.fanOutRelationshipActivity({
        node,
        value,
        outputPorts: outputs,
      });
    }
    case "join": {
      if (node.config.mode === "any") {
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

        return activityFns.joinRelationshipActivity({
          node,
          handles: [handle],
          values: [value],
        });
      }

      const ready = requiredHandles.every(
        (handle: string) => peekBufferedInputs(store, node.id, handle).length > 0
      );
      if (!ready) {
        return null;
      }

      const values = consumeBufferedInputs(store, node.id, requiredHandles);
      return activityFns.joinRelationshipActivity({
        node,
        handles: requiredHandles,
        values,
      });
    }
    case "collect": {
      const values = peekBufferedInputs(store, node.id, "in");
      if (values.length < node.config.count) {
        return null;
      }

      const collected = values.splice(0, node.config.count);
      return activityFns.collectRelationshipActivity({ node, values: collected });
    }
    case "map": {
      const value = takeBufferedInput(store, node.id, ["in", DEFAULT_PORT]);
      if (value === undefined) {
        return null;
      }

      return activityFns.mapRelationshipActivity({ node, value });
    }
    case "reduce": {
      const values = peekBufferedInputs(store, node.id, "in");
      const expectedCount = node.config.expectedCount ?? values.length;

      if (values.length < expectedCount || expectedCount === 0) {
        return null;
      }

      const toReduce = values.splice(0, expectedCount);
      return activityFns.reduceRelationshipActivity({
        node,
        values: toReduce,
      });
    }
  }
}
