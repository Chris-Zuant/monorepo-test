import type {
  IntegrationNodeDefinition,
  RelationshipNodeDefinition,
} from "@/features/integrations/models/reactFlowNodeData.types";
import {
  Blocks,
  Filter,
  FolderGit2,
  Funnel,
  Clock3,
  GitBranch,
  GitFork,
  Logs,
  RefreshCcwDot,
  ScanSearch,
  Send,
  Split,
  UserRoundPlus,
} from "lucide-react";
import { IntegrationNodeType, type RelationshipNodeType } from "@monorepo/shared";
import { IntegrationNode } from "./IntegrationNode.component";
import { RelationshipNode } from "./RelationshipNode.component";

export const ACTION_NODE_DEFINITIONS: Record<IntegrationNodeType, IntegrationNodeDefinition> = {
  [IntegrationNodeType.HttpRequest]: {
    type: IntegrationNodeType.HttpRequest,
    label: "HTTP Request",
    description: "Send an HTTP request",
    category: "core",
    activityName: "httpRequestActivity",
    icon: Send,
    inputs: [
      { id: "in", label: "Input", direction: "input", cardinality: "one", dataType: "object" }
    ],
    outputs: [
      { id: "success", label: "Success", direction: "output", cardinality: "one", dataType: "object" }
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
      { id: "in", label: "Input", direction: "input", cardinality: "one", dataType: "any" }
    ],
    outputs: [
      { id: "out", label: "Output", direction: "output", cardinality: "one", dataType: "any" }
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
      { id: "in", label: "Input", direction: "input", cardinality: "one", dataType: "any" }
    ],
    outputs: [
      { id: "out", label: "Output", direction: "output", cardinality: "one", dataType: "object" }
    ],
    configSchema: [
      {
        key: "mode",
        label: "Mode",
        kind: "select",
        defaultValue: "appendTimestamp",
        options: [{ label: "Append Timestamp", value: "appendTimestamp" }]
      }
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
      { id: "in", label: "Input", direction: "input", cardinality: "one", dataType: "any" }
    ],
    outputs: [
      { id: "success", label: "Success", direction: "output", cardinality: "one", dataType: "object" }
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
      { id: "in", label: "Input", direction: "input", cardinality: "one", dataType: "any" }
    ],
    outputs: [
      { id: "out", label: "Output", direction: "output", cardinality: "one", dataType: "any" }
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
      { id: "in", label: "Input", direction: "input", cardinality: "one", dataType: "object" }
    ],
    outputs: [
      { id: "contact", label: "Contact", direction: "output", cardinality: "one", dataType: "object" }
    ],
    configSchema: [
      { key: "email", label: "Email", kind: "text", required: true },
      { key: "name", label: "Name", kind: "text", required: true }
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
      { id: "in", label: "Input", direction: "input", cardinality: "one", dataType: "array" }
    ],
    outputs: [
      { id: "items", label: "Items", direction: "output", cardinality: "one", dataType: "array" }
    ],
    configSchema: []
  },
 
}

export const RELATIONSHIP_NODE_DEFINITIONS: Record<
  RelationshipNodeType,
  RelationshipNodeDefinition
> = {
  condition: {
    type: "condition",
    label: "Condition",
    description: "Branch flow to one of several outputs.",
    category: "relationship",
    icon: Split,
    inputs: [
      { id: "in", label: "In", direction: "input", cardinality: "one", dataType: "any" },
    ],
    outputs: [
      { id: "true", label: "True", direction: "output", cardinality: "one", dataType: "any" },
      { id: "false", label: "False", direction: "output", cardinality: "one", dataType: "any" },
    ],
    configSchema: [
      { key: "expression", label: "Expression", kind: "text" },
    ],
  },
  fanOut: {
    type: "fanOut",
    label: "Fan Out",
    description: "Duplicate or partition a payload to multiple branches.",
    category: "relationship",
    icon: GitFork,
    inputs: [
      { id: "in", label: "In", direction: "input", cardinality: "one", dataType: "any" },
    ],
    outputs: [
      { id: "branch-a", label: "Branch A", direction: "output", cardinality: "one", dataType: "any" }
    ],
    configSchema: [
      {
        key: "mode",
        label: "Mode",
        kind: "select",
        defaultValue: "clone",
        options: [
          { label: "Clone", value: "clone" },
          { label: "Partition", value: "partition" },
        ],
      },
    ],
  },
  join: {
    type: "join",
    label: "Join",
    description: "Combine branch coordination using all, any, or barrier modes.",
    category: "relationship",
    icon: FolderGit2,
    inputs: [
      { id: "a", label: "A", direction: "input", cardinality: "one", dataType: "any" },
      { id: "b", label: "B", direction: "input", cardinality: "one", dataType: "any" },
    ],
    outputs: [
      { id: "out", label: "Out", direction: "output", cardinality: "one", dataType: "array" },
    ],
    configSchema: [
      {
        key: "mode",
        label: "Mode",
        kind: "select",
        defaultValue: "all",
        options: [
          { label: "All", value: "all" },
          { label: "Any", value: "any" },
          { label: "Barrier", value: "barrier" },
        ],
      },
      {
        key: "emitMode",
        label: "Emit Mode",
        kind: "select",
        defaultValue: "array",
        options: [
          { label: "Array", value: "array" },
          { label: "Object", value: "object" },
        ],
      },
    ],
  },
  collect: {
    type: "collect",
    label: "Collect",
    description: "Gather many items before emitting an array.",
    category: "relationship",
    icon: Funnel,
    inputs: [
      { id: "in", label: "In", direction: "input", cardinality: "many", dataType: "any" },
    ],
    outputs: [
      { id: "out", label: "Out", direction: "output", cardinality: "one", dataType: "array" },
    ],
    configSchema: [
      { key: "count", label: "Count", kind: "number", required: true, defaultValue: 2 },
    ],
  },
  map: {
    type: "map",
    label: "Map",
    description: "Split an array into individual item branches.",
    category: "relationship",
    icon: ScanSearch,
    inputs: [
      { id: "in", label: "In", direction: "input", cardinality: "one", dataType: "array" },
    ],
    outputs: [
      { id: "item", label: "Item", direction: "output", cardinality: "many", dataType: "any" },
    ],
    configSchema: [
      { key: "itemPortId", label: "Item Port Id", kind: "text" },
    ],
  },
  reduce: {
    type: "reduce",
    label: "Reduce",
    description: "Aggregate many inputs into a single output.",
    category: "relationship",
    icon: Filter,
    inputs: [
      { id: "in", label: "In", direction: "input", cardinality: "many", dataType: "any" },
    ],
    outputs: [
      { id: "out", label: "Out", direction: "output", cardinality: "one", dataType: "any" },
    ],
    configSchema: [
      {
        key: "strategy",
        label: "Strategy",
        kind: "select",
        defaultValue: "merge",
        options: [
          { label: "Sum", value: "sum" },
          { label: "Concat", value: "concat" },
          { label: "Merge", value: "merge" },
          { label: "Custom", value: "custom" },
        ],
      },
    ],
  },
}

export const nodeTypes = {
  integrationNode: IntegrationNode,
  relationshipNode: RelationshipNode,
};

export type NodeTypesMap = typeof nodeTypes;

export default nodeTypes;
