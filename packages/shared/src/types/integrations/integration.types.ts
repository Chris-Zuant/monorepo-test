import type { RelationshipGraphNode } from "./relationshipNode.types"

export const IntegrationNodeType = {
  HttpRequest: "httpRequest",
  Delay: "delay",
  Transform: "transform",
  RandomFailure: "randomFailure",
  Log: "log",
  CreateContact: "createContact",
  Batch: "batch",
} as const

export type IntegrationNodeType = (typeof IntegrationNodeType)[keyof typeof IntegrationNodeType]

export interface IntegrationGraphDefinition {
  id: string
  name: string
  nodes: IntegrationGraphNode[]
  edges: IntegrationGraphEdge[]
}

export interface BaseActionNode<
  TType extends IntegrationNodeType
> extends IntegrationGraphNodeBase<TType> {}

export interface HttpRequestNode extends BaseActionNode<"httpRequest"> {
  type: "httpRequest";
  config: {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    headers?: Record<string, string>;
    body?: unknown;
  };
}

export interface DelayNode extends BaseActionNode<"delay"> {
  type: "delay";
  config: {
    ms: number;
  };
}

export interface TransformNode extends BaseActionNode<"transform"> {
  type: "transform";
  config: {
    mode: "appendTimestamp";
  };
}

export interface RandomFailureNode extends BaseActionNode<"randomFailure"> {
  type: "randomFailure";
  config: {
    failureRate?: number;
  };
}

export interface LogNode extends BaseActionNode<"log"> {
  type: "log";
  config: {
    message: string;
    level?: "info" | "warn" | "error";
  };
}

export interface CreateContactNode extends BaseActionNode<"createContact"> {
  type: "createContact";
  config: {
    email: string;
    name: string;
  };
}

export interface BatchNode extends BaseActionNode<"batch"> {
  type: "batch";
  config: {};
}

export type ActionGraphNode =
  | HttpRequestNode
  | DelayNode
  | TransformNode
  | RandomFailureNode
  | LogNode
  | CreateContactNode
  | BatchNode;

export type IntegrationGraphNode = ActionGraphNode | RelationshipGraphNode;

export interface IntegrationGraphNodeBase<TType extends string = IntegrationNodeType> {
  id: string;
  type: TType;
  name: string;
  position: {
    x: number;
    y: number;
  };
}

export interface IntegrationGraphEdge {
  id: string
  source: string
  sourceHandle?: string
  target: string
  targetHandle?: string
  label?: string
}
