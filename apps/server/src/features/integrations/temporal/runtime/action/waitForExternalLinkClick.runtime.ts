import {
  condition,
  defineSignal,
  setHandler,
} from "@temporalio/workflow";
import type { ActionGraphNode, WaitForExternalLinkNode } from "@monorepo/shared";

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
    node: ActionGraphNode,
    payload: unknown
  ) => {

    const waitNode = node as WaitForExternalLinkNode;

    await condition(() => clickedLinksByNodeId.has(waitNode.id));

    const clickPayload = clickedLinksByNodeId.get(waitNode.id)!;
    clickedLinksByNodeId.delete(waitNode.id);

    const payloadRecord =
      payload && typeof payload === "object" && !Array.isArray(payload)
        ? (payload as Record<string, unknown>)
        : {};

    return {
      ...payloadRecord,
      linkClicked: true,
      clickedAt: clickPayload.clickedAt,
      clickUrl: clickPayload.requestUrl,
      clickedNodeId: waitNode.id,
    };
  };
}
