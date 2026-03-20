export const IntegrationNodeType = {
  HttpRequest: "httpRequest",
  Delay: "delay",
  Transform: "transform",
  RandomFailure: "randomFailure",
  Log: "log",
  CreateContact: "createContact",
  CheckCondition: "checkCondition",
  Batch: "batch",
} as const

export type IntegrationNodeType = (typeof IntegrationNodeType)[keyof typeof IntegrationNodeType]

  export interface IntegrationGraphDefinition {
  id: string
  name: string
  nodes: IntegrationGraphNode[]
  edges: IntegrationGraphEdge[]
}

export interface IntegrationGraphNodeBase {
  id: string;
  type: IntegrationNodeType;
  name: string;
  position: {
    x: number;
    y: number;
  };
}

export interface HttpRequestNode extends IntegrationGraphNodeBase {
  type: "httpRequest";
  config: {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    headers?: Record<string, string>;
    body?: unknown;
  };
}

export interface DelayNode extends IntegrationGraphNodeBase {
  type: "delay";
  config: {
    ms: number;
  };
}

export interface TransformNode extends IntegrationGraphNodeBase {
  type: "transform";
  config: {
    mode: "appendTimestamp";
  };
}

export interface RandomFailureNode extends IntegrationGraphNodeBase {
  type: "randomFailure";
  config: {
    failureRate?: number;
  };
}

export interface LogNode extends IntegrationGraphNodeBase {
  type: "log";
  config: {
    message: string;
    level?: "info" | "warn" | "error";
  };
}

export interface CreateContactNode extends IntegrationGraphNodeBase {
  type: "createContact";
  config: {
    email: string;
    name: string;
  };
}

export interface CheckConditionNode extends IntegrationGraphNodeBase {
  type: "checkCondition";
  config: {
    value: number;
  };
}

export interface BatchNode extends IntegrationGraphNodeBase {
  type: "batch";
  config: {};
}

export type IntegrationGraphNode =
  | HttpRequestNode
  | DelayNode
  | TransformNode
  | RandomFailureNode
  | LogNode
  | CreateContactNode
  | CheckConditionNode
  | BatchNode;

export interface IntegrationGraphEdge {
  id: string
  source: string
  sourceHandle?: string
  target: string
  targetHandle?: string
  label?: string
}
