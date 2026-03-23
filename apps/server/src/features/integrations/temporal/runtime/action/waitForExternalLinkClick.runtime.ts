import {
  condition,
  defineSignal,
  setHandler,
} from "@temporalio/workflow";
import type { WaitForExternalLinkNode } from "@monorepo/shared";
import type { ExecutableGraphNode } from "../../../services/integrationWorkflowBuilder.service";

export const EXTERNAL_LINK_CLICKED_SIGNAL = "externalLinkClicked";

export interface ExternalLinkClickedSignalPayload {
  nodeId: string;
  clickedAt: string;
  requestUrl: string;
}

const externalLinkClickedSignal = defineSignal<[ExternalLinkClickedSignalPayload]>(
  EXTERNAL_LINK_CLICKED_SIGNAL
);

export function createWaitForExternalLinkClickRuntime() {
  const clickedLinksByNodeId = new Map<string, ExternalLinkClickedSignalPayload>();

  setHandler(externalLinkClickedSignal, (payload) => {
    clickedLinksByNodeId.set(payload.nodeId, payload);
  });

  return async (
    node: WaitForExternalLinkNode & ExecutableGraphNode,
    payload: unknown
  ) => {
    await condition(() => clickedLinksByNodeId.has(node.id));

    const clickPayload = clickedLinksByNodeId.get(node.id)!;
    clickedLinksByNodeId.delete(node.id);

    const payloadRecord =
      payload && typeof payload === "object" && !Array.isArray(payload)
        ? (payload as Record<string, unknown>)
        : {};

    return {
      ...payloadRecord,
      linkClicked: true,
      clickedAt: clickPayload.clickedAt,
      clickUrl: clickPayload.requestUrl,
      clickedNodeId: node.id,
    };
  };
}
