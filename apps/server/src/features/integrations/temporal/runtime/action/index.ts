export * from "./waitForExternalLinkClick.runtime";

import { createWaitForExternalLinkClickRuntime } from "./waitForExternalLinkClick.runtime";

export const actionRuntimeFactories = {
  waitForExternalLinkClick: createWaitForExternalLinkClickRuntime,
};
