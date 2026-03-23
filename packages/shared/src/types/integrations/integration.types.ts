import type { RelationshipGraphNode } from "./relationshipNode.types"
import type { TriggerGraphNode } from "./triggerNodes.types"

export const IntegrationNodeType = {
  HttpRequest: "httpRequest",
  Delay: "delay",
  Transform: "transform",
  RandomFailure: "randomFailure",
  Log: "log",
  CreateContact: "createContact",
  Batch: "batch",
  WaitForExternalLink: "waitForExternalLink",
} as const

export type IntegrationNodeType = (typeof IntegrationNodeType)[keyof typeof IntegrationNodeType]
export type IntegrationGraphNodeKind = "trigger" | "action" | "relationship"

export interface IntegrationGraphDefinition {
  id: string
  name: string
  nodes: IntegrationGraphNode[]
  edges: IntegrationGraphEdge[]
}

export interface BaseActionNode<
  TType extends IntegrationNodeType
> extends IntegrationGraphNodeBase<TType, "action"> {}

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

export interface WaitForExternalLinkNode extends BaseActionNode<"waitForExternalLink"> {
  type: "waitForExternalLink";
  config: {
    linkText: string;
    completionMessage?: string;
  };
}

export type ActionGraphNode =
  | HttpRequestNode
  | DelayNode
  | TransformNode
  | RandomFailureNode
  | LogNode
  | CreateContactNode
  | BatchNode
  | WaitForExternalLinkNode;

export type IntegrationGraphNode =
  | TriggerGraphNode
  | ActionGraphNode
  | RelationshipGraphNode;

export interface IntegrationGraphNodeBase<
  TType extends string = IntegrationNodeType,
  TNodeKind extends IntegrationGraphNodeKind = "action"
> {
  id: string;
  nodeKind: TNodeKind;
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
