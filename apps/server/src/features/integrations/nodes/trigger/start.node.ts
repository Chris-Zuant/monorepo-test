import type { StartTriggerNode } from "@monorepo/shared";

export function startNode(_node: StartTriggerNode) {
  return {
    source: "start",
    startedAt: new Date().toISOString(),
  };
}
