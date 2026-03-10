import type { IntegrationNodeDefinition } from "@/features/integrations/models/reactFlowNodeData.types";
import {
  Blocks,
  Clock3,
  GitBranch,
  Logs,
  RefreshCcwDot,
  Send,
  Split,
  UserRoundPlus,
} from "lucide-react";
import { IntegrationNodeType } from "@monorepo/shared";
import { IntegrationNode } from "./IntegrationNode.component";

export const NODE_DEFINITIONS: Record<IntegrationNodeType, IntegrationNodeDefinition> = {
  [IntegrationNodeType.HttpRequest]: {
    type: IntegrationNodeType.HttpRequest,
    label: "HTTP Request",
    description: "Send an HTTP request",
    category: "core",
    activityName: "httpRequestActivity",
    icon: Send,
    inputs: [
      { id: "in", label: "Input", portType: "input", dataType: "object" }
    ],
    outputs: [
      { id: "success", label: "Success", portType: "output", dataType: "object" }
    ],
    configSchema: [
      { key: "url", label: "URL", kind: "text", required: true },
      {
        key: "method",
        label: "Method",
        kind: "select",
        defaultValue: "GET",
        options: [
          { label: "GET", value: "GET" },
          { label: "POST", value: "POST" },
          { label: "PUT", value: "PUT" },
          { label: "DELETE", value: "DELETE" }
        ]
      },
      { key: "headers", label: "Headers", kind: "json", defaultValue: {} },
      { key: "body", label: "Body", kind: "json", defaultValue: null }
    ]
  },

  [IntegrationNodeType.Delay]: {
    type: IntegrationNodeType.Delay,
    label: "Delay",
    description: "Pause execution for a period",
    category: "control",
    activityName: "delayActivity",
    icon: Clock3,
    inputs: [
      { id: "in", label: "Input", portType: "input", dataType: "any" }
    ],
    outputs: [
      { id: "out", label: "Output", portType: "output", dataType: "any" }
    ],
    configSchema: [
      { key: "ms", label: "Milliseconds", kind: "number", required: true, defaultValue: 1000 }
    ]
  },

  [IntegrationNodeType.Transform]: {
    type: IntegrationNodeType.Transform,
    label: "Transform",
    description: "Transform input data",
    category: "data",
    activityName: "transformActivity",
    icon: RefreshCcwDot,
    inputs: [
      { id: "in", label: "Input", portType: "input", dataType: "any" }
    ],
    outputs: [
      { id: "out", label: "Output", portType: "output", dataType: "object" }
    ],
    configSchema: [
      { key: "mode", label: "Mode", kind: "select", defaultValue: "appendTimestamp", options: [
        { label: "Append Timestamp", value: "appendTimestamp" }
      ]}
    ]
  },

  [IntegrationNodeType.RandomFailure]: {
    type: IntegrationNodeType.RandomFailure,
    label: "Random Failure",
    description: "Fails randomly for retry testing",
    category: "control",
    activityName: "randomFailureActivity",
    icon: GitBranch,
    inputs: [
      { id: "in", label: "Input", portType: "input", dataType: "any" }
    ],
    outputs: [
      { id: "success", label: "Success", portType: "output", dataType: "object" }
    ],
    configSchema: [
      { key: "failureRate", label: "Failure Rate", kind: "number", defaultValue: 0.5 }
    ]
  },

  [IntegrationNodeType.Log]: {
    type: IntegrationNodeType.Log,
    label: "Log",
    description: "Write a log line",
    category: "core",
    activityName: "logActivity",
    icon: Logs,
    inputs: [
      { id: "in", label: "Input", portType: "input", dataType: "any" }
    ],
    outputs: [
      { id: "out", label: "Output", portType: "output", dataType: "any" }
    ],
    configSchema: [
      { key: "message", label: "Message", kind: "text", required: true },
      {
        key: "level",
        label: "Level",
        kind: "select",
        defaultValue: "info",
        options: [
          { label: "Info", value: "info" },
          { label: "Warn", value: "warn" },
          { label: "Error", value: "error" }
        ]
      }
    ]
  },

  [IntegrationNodeType.CreateContact]: {
    type: IntegrationNodeType.CreateContact,
    label: "Create Contact",
    description: "Create a fake CRM contact",
    category: "crm",
    activityName: "createContactActivity",
    icon: UserRoundPlus,
    inputs: [
      { id: "in", label: "Input", portType: "input", dataType: "object" }
    ],
    outputs: [
      { id: "contact", label: "Contact", portType: "output", dataType: "object" }
    ],
    configSchema: [
      { key: "email", label: "Email", kind: "text", required: true },
      { key: "name", label: "Name", kind: "text", required: true }
    ]
  },

  [IntegrationNodeType.CheckCondition]: {
    type: IntegrationNodeType.CheckCondition,
    label: "Condition",
    description: "Route based on a condition",
    category: "control",
    activityName: "checkConditionActivity",
    icon: Split,
    inputs: [
      { id: "in", label: "Input", portType: "input", dataType: "object" }
    ],
    outputs: [
      { id: "true", label: "True", portType: "output", dataType: "boolean" },
      { id: "false", label: "False", portType: "output", dataType: "boolean" }
    ],
    configSchema: [
      { key: "value", label: "Value", kind: "number", required: true }
    ]
  },

  [IntegrationNodeType.Batch]: {
    type: IntegrationNodeType.Batch,
    label: "Batch",
    description: "Process a list of items",
    category: "data",
    activityName: "batchActivity",
    icon: Blocks,
    inputs: [
      { id: "in", label: "Input", portType: "input", dataType: "array" }
    ],
    outputs: [
      { id: "items", label: "Items", portType: "output", dataType: "array" }
    ],
    configSchema: []
  }
}

export const nodeTypes = {
  integrationNode: IntegrationNode,
};

export type NodeTypesMap = typeof nodeTypes;

export default nodeTypes;
