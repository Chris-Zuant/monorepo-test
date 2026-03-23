import type {
  IntegrationNodeDefinition,
  RelationshipNodeDefinition,
  TriggerNodeDefinition,
} from "@/features/integrations/models/reactFlowNodeData.types";
import {
  Blocks,
  ClipboardPlus,
  Filter,
  FolderGit2,
  Funnel,
  Clock3,
  GitBranch,
  GitFork,
  Logs,
  MousePointerClick,
  RefreshCcwDot,
  ScanSearch,
  Send,
  Split,
  UserRoundPlus,
  Webhook,
} from "lucide-react";
import {
  IntegrationNodeType,
  TriggerNodeType,
  type RelationshipNodeType,
} from "@monorepo/shared";
import { ActionNode } from "./IntegrationNode.component";
import { RelationshipNode } from "./RelationshipNode.component";
import { TriggerNode } from "./TriggerNode.component";

export const TRIGGER_NODE_DEFINITIONS: Record<TriggerNodeType, TriggerNodeDefinition> = {
  [TriggerNodeType.InternalLeadForm]: {
    nodeKind: "trigger",
    type: TriggerNodeType.InternalLeadForm,
    label: "Internal Lead Form",
    description: "Start the workflow from a fake internal lead submission.",
    category: "trigger",
    activityName: "internalLeadFormTriggerActivity",
    icon: ClipboardPlus,
    inputs: [],
    outputs: [
      { id: "out", label: "Lead", direction: "output", cardinality: "one", dataType: "object" },
    ],
    configSchema: [
      { key: "firstName", label: "First Name", kind: "text", required: true, defaultValue: "Ada" },
      { key: "lastName", label: "Last Name", kind: "text", required: true, defaultValue: "Lovelace" },
      { key: "company", label: "Company", kind: "text", required: true, defaultValue: "Analytical Engines Ltd" },
      {
        key: "emailAddress",
        label: "Email Address",
        kind: "text",
        required: true,
        defaultValue: "ada.lovelace@example.com",
      },
    ],
  },
  [TriggerNodeType.WebhookLead]: {
    nodeKind: "trigger",
    type: TriggerNodeType.WebhookLead,
    label: "Webhook Lead",
    description: "Start the workflow from an incoming webhook lead payload.",
    category: "trigger",
    activityName: "webhookLeadTriggerActivity",
    icon: Webhook,
    inputs: [],
    outputs: [
      { id: "out", label: "Lead", direction: "output", cardinality: "one", dataType: "object" },
    ],
    configSchema: [
      { key: "firstName", label: "First Name", kind: "text", required: true, defaultValue: "Grace" },
      { key: "lastName", label: "Last Name", kind: "text", required: true, defaultValue: "Hopper" },
      { key: "company", label: "Company", kind: "text", required: true, defaultValue: "Compiler Systems" },
      {
        key: "emailAddress",
        label: "Email Address",
        kind: "text",
        required: true,
        defaultValue: "grace.hopper@example.com",
      },
    ],
  },
};

export const ACTION_NODE_DEFINITIONS: Record<IntegrationNodeType, IntegrationNodeDefinition> = {
  [IntegrationNodeType.HttpRequest]: {
    nodeKind: "action",
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
      { id: "out", label: "Output", direction: "output", cardinality: "one", dataType: "object" }
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
    nodeKind: "action",
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
    nodeKind: "action",
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
    nodeKind: "action",
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
      { id: "out", label: "Output", direction: "output", cardinality: "one", dataType: "object" }
    ],
    configSchema: [
      { key: "failureRate", label: "Failure Rate", kind: "number", defaultValue: 0.5 }
    ]
  },

  [IntegrationNodeType.Log]: {
    nodeKind: "action",
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
    nodeKind: "action",
    type: IntegrationNodeType.CreateContact,
    label: "Create Contact",
    description: "Create a fake CRM contact from the incoming payload",
    category: "crm",
    activityName: "createContactActivity",
    icon: UserRoundPlus,
    inputs: [
      { id: "in", label: "Input", direction: "input", cardinality: "one", dataType: "object" }
    ],
    outputs: [
      { id: "out", label: "Output", direction: "output", cardinality: "one", dataType: "object" }
    ],
    configSchema: [
      { key: "email", label: "Email Override", kind: "text" }
    ]
  },

  [IntegrationNodeType.Batch]: {
    nodeKind: "action",
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
      { id: "out", label: "Output", direction: "output", cardinality: "one", dataType: "array" }
    ],
    configSchema: []
  },
  [IntegrationNodeType.WaitForExternalLink]: {
    nodeKind: "action",
    type: IntegrationNodeType.WaitForExternalLink,
    label: "Wait for Link Click",
    description: "Pause the workflow until an external link is clicked.",
    category: "control",
    activityName: "waitForExternalLink",
    icon: MousePointerClick,
    inputs: [
      { id: "in", label: "Input", direction: "input", cardinality: "one", dataType: "object" }
    ],
    outputs: [
      { id: "out", label: "Output", direction: "output", cardinality: "one", dataType: "object" }
    ],
    configSchema: [
      {
        key: "linkText",
        label: "Link Text",
        kind: "text",
        required: true,
        defaultValue: "Continue workflow"
      },
      {
        key: "completionMessage",
        label: "Completion Message",
        kind: "text",
        defaultValue: "The workflow has been resumed."
      }
    ]
  },
 
}

export const RELATIONSHIP_NODE_DEFINITIONS: Record<
  RelationshipNodeType,
  RelationshipNodeDefinition
> = {
  condition: {
    nodeKind: "relationship",
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
    nodeKind: "relationship",
    type: "fanOut",
    label: "Fan Out",
    description: "Duplicate or partition a payload to multiple branches.",
    category: "relationship",
    icon: GitFork,
    inputs: [
      { id: "in", label: "In", direction: "input", cardinality: "one", dataType: "any" },
    ],
    outputs: [
      { id: "out", label: "Out", direction: "output", cardinality: "many", dataType: "any" }
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
    nodeKind: "relationship",
    type: "join",
    label: "Join",
    description: "Combine branch coordination using all, any, or barrier modes.",
    category: "relationship",
    icon: FolderGit2,
    inputs: [
      { id: "in", label: "In", direction: "input", cardinality: "many", dataType: "any" },
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
        key: "expectedCount",
        label: "Expected Count",
        kind: "number",
        defaultValue: 2,
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
    nodeKind: "relationship",
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
    nodeKind: "relationship",
    type: "map",
    label: "Map",
    description: "Split an array into individual item branches.",
    category: "relationship",
    icon: ScanSearch,
    inputs: [
      { id: "in", label: "In", direction: "input", cardinality: "one", dataType: "array" },
    ],
    outputs: [
      { id: "out", label: "Out", direction: "output", cardinality: "many", dataType: "any" },
    ],
    configSchema: [],
  },
  reduce: {
    nodeKind: "relationship",
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
  triggerNode: TriggerNode,
  integrationNode: ActionNode,
  relationshipNode: RelationshipNode,
};

export type NodeTypesMap = typeof nodeTypes;

export default nodeTypes;
