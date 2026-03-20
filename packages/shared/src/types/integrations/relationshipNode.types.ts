import type { PortDefinition } from "./portDefinition.types";

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

export interface BaseRelationshipNode<TType extends RelationshipNodeType, TConfig> {
  id: string;
  type: TType;
  category: "relationship";
  name: string;
  description?: string;
  inputs: PortDefinition[];
  outputs: PortDefinition[];
  config: TConfig;
}

export interface PassThroughRelationshipNode
  extends BaseRelationshipNode<"passThrough", Record<string, never>> {
  inputs: [
    {
      id: "in";
      label: "In";
      direction: "input";
      cardinality: "one";
      dataType?: "any";
    }
  ];
  outputs: [
    {
      id: "out";
      label: "Out";
      direction: "output";
      cardinality: "one";
      dataType?: "any";
    }
  ];
}

export interface ConditionRelationshipConfig {
  outputPorts: string[];
  expression?: string;
}

export interface ConditionRelationshipNode
  extends BaseRelationshipNode<"condition", ConditionRelationshipConfig> {
  inputs: [
    {
      id: "in";
      label: "In";
      direction: "input";
      cardinality: "one";
      dataType?: "any";
    }
  ];
  outputs: PortDefinition[];
}

export interface FanOutRelationshipConfig {
  outputPorts: string[];
  mode: "clone" | "partition";
}

export interface FanOutRelationshipNode
  extends BaseRelationshipNode<"fanOut", FanOutRelationshipConfig> {
  inputs: [
    {
      id: "in";
      label: "In";
      direction: "input";
      cardinality: "one";
      dataType?: "any";
    }
  ];
  outputs: PortDefinition[];
}

export interface JoinAllRelationshipConfig {
  expectedPorts: string[];
  emitMode?: "array" | "object";
}

export interface JoinAllRelationshipNode
  extends BaseRelationshipNode<"joinAll", JoinAllRelationshipConfig> {
  inputs: PortDefinition[];
  outputs: [
    {
      id: "out";
      label: "Out";
      direction: "output";
      cardinality: "one";
      dataType?: "array" | "object";
    }
  ];
}

export interface MergeAnyRelationshipConfig {
  inputPorts: string[];
}

export interface MergeAnyRelationshipNode
  extends BaseRelationshipNode<"mergeAny", MergeAnyRelationshipConfig> {
  inputs: PortDefinition[];
  outputs: [
    {
      id: "out";
      label: "Out";
      direction: "output";
      cardinality: "one";
      dataType?: "any";
    }
  ];
}

export interface CollectRelationshipConfig {
  count: number;
  emitMode?: "array";
}

export interface CollectRelationshipNode
  extends BaseRelationshipNode<"collect", CollectRelationshipConfig> {
  inputs: [
    {
      id: "in";
      label: "In";
      direction: "input";
      cardinality: "many";
      dataType?: "any";
    }
  ];
  outputs: [
    {
      id: "out";
      label: "Out";
      direction: "output";
      cardinality: "one";
      dataType?: "array";
    }
  ];
}

export interface MapRelationshipConfig {
  itemPortId?: string;
}

export interface MapRelationshipNode
  extends BaseRelationshipNode<"map", MapRelationshipConfig> {
  inputs: [
    {
      id: "in";
      label: "In";
      direction: "input";
      cardinality: "one";
      dataType?: "array";
    }
  ];
  outputs: [
    {
      id: "item";
      label: "Item";
      direction: "output";
      cardinality: "many";
      dataType?: "any";
    }
  ];
}

export interface ReduceRelationshipConfig {
  expectedCount?: number;
  strategy: "sum" | "concat" | "merge" | "custom";
  initialValue?: unknown;
}

export interface ReduceRelationshipNode
  extends BaseRelationshipNode<"reduce", ReduceRelationshipConfig> {
  inputs: [
    {
      id: "in";
      label: "In";
      direction: "input";
      cardinality: "many";
      dataType?: "any";
    }
  ];
  outputs: [
    {
      id: "out";
      label: "Out";
      direction: "output";
      cardinality: "one";
      dataType?: "any";
    }
  ];
}

export interface BarrierRelationshipConfig {
  branches: string[];
}

export interface BarrierRelationshipNode
  extends BaseRelationshipNode<"barrier", BarrierRelationshipConfig> {
  inputs: PortDefinition[];
  outputs: [
    {
      id: "out";
      label: "Out";
      direction: "output";
      cardinality: "one";
      dataType?: "any";
    }
  ];
}

export type RelationshipNode =
  | PassThroughRelationshipNode
  | ConditionRelationshipNode
  | FanOutRelationshipNode
  | JoinAllRelationshipNode
  | MergeAnyRelationshipNode
  | CollectRelationshipNode
  | MapRelationshipNode
  | ReduceRelationshipNode
  | BarrierRelationshipNode;
