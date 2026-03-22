import type { IntegrationGraphNodeBase } from "./integration.types";

export type RelationshipNodeType =
  | "condition"
  | "fanOut"
  | "join"
  | "collect"
  | "map"
  | "reduce";

export interface BaseRelationshipNode<
  TType extends RelationshipNodeType,
  TConfig
> extends IntegrationGraphNodeBase<TType> {
  config: TConfig;
}

export interface ConditionRelationshipConfig {
  outputPorts: string[];
  expression?: string;
}

export interface ConditionRelationshipNode
  extends BaseRelationshipNode<"condition", ConditionRelationshipConfig> {
  type: "condition";
}

export interface FanOutRelationshipConfig {
  outputPorts: string[];
  mode: "clone" | "partition";
}

export interface FanOutRelationshipNode
  extends BaseRelationshipNode<"fanOut", FanOutRelationshipConfig> {
  type: "fanOut";
}

export interface JoinRelationshipConfig {
  mode: "all" | "any" | "barrier";
  inputPorts: string[];
  emitMode?: "array" | "object";
}

export interface JoinRelationshipNode
  extends BaseRelationshipNode<"join", JoinRelationshipConfig> {
  type: "join";
}

export interface CollectRelationshipConfig {
  count: number;
  emitMode?: "array";
}

export interface CollectRelationshipNode
  extends BaseRelationshipNode<"collect", CollectRelationshipConfig> {
  type: "collect";
}

export interface MapRelationshipConfig {
  itemPortId?: string;
}

export interface MapRelationshipNode
  extends BaseRelationshipNode<"map", MapRelationshipConfig> {
  type: "map";
}

export interface ReduceRelationshipConfig {
  expectedCount?: number;
  strategy: "sum" | "concat" | "merge" | "custom";
  initialValue?: unknown;
}

export interface ReduceRelationshipNode
  extends BaseRelationshipNode<"reduce", ReduceRelationshipConfig> {
  type: "reduce";
}

export type RelationshipGraphNode =
  | ConditionRelationshipNode
  | FanOutRelationshipNode
  | JoinRelationshipNode
  | CollectRelationshipNode
  | MapRelationshipNode
  | ReduceRelationshipNode;
