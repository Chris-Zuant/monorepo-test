import type { IntegrationGraphNodeBase } from "./integration.types";

export type RelationshipNodeType =
  | "passThrough"
  | "condition"
  | "fanOut"
  | "joinAll"
  | "mergeAny"
  | "collect"
  | "map"
  | "reduce"
  | "barrier";

export interface BaseRelationshipNode<
  TType extends RelationshipNodeType,
  TConfig
> extends IntegrationGraphNodeBase<TType> {
  config: TConfig;
}

export interface PassThroughRelationshipNode
  extends BaseRelationshipNode<"passThrough", Record<string, never>> {
  type: "passThrough";
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

export interface JoinAllRelationshipConfig {
  expectedPorts: string[];
  emitMode?: "array" | "object";
}

export interface JoinAllRelationshipNode
  extends BaseRelationshipNode<"joinAll", JoinAllRelationshipConfig> {
  type: "joinAll";
}

export interface MergeAnyRelationshipConfig {
  inputPorts: string[];
}

export interface MergeAnyRelationshipNode
  extends BaseRelationshipNode<"mergeAny", MergeAnyRelationshipConfig> {
  type: "mergeAny";
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

export interface BarrierRelationshipConfig {
  branches: string[];
}

export interface BarrierRelationshipNode
  extends BaseRelationshipNode<"barrier", BarrierRelationshipConfig> {
  type: "barrier";
}

export type RelationshipGraphNode =
  | PassThroughRelationshipNode
  | ConditionRelationshipNode
  | FanOutRelationshipNode
  | JoinAllRelationshipNode
  | MergeAnyRelationshipNode
  | CollectRelationshipNode
  | MapRelationshipNode
  | ReduceRelationshipNode
  | BarrierRelationshipNode;
