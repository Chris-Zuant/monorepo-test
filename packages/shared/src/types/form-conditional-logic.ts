export type NodeType = "start" | "question" | "condition" | "end";

export type QuestionNodeData = {
  label: string;
  fieldKey: string;
  inputType: "text" | "number" | "select" | "checkbox";
  required?: boolean;
  options?: { value: string; label: string }[];
};

export type ConditionNodeData = {
  label: string;
  expression: string; // e.g. "age >= 18 && country == 'UK'"
  branches: { handle: string; label: string }[]; // e.g. yes/no handles
};

export type FlowNodeData =
  | ({ kind: "start" } & { label: string })
  | ({ kind: "end" } & { label: string })
  | ({ kind: "question" } & QuestionNodeData)
  | ({ kind: "condition" } & ConditionNodeData);

export type FlowNode = {
  id: string;
  type: NodeType;     // reactflow node type
  position: { x: number; y: number };
  data: FlowNodeData; // your domain data
};

export type FlowEdge = {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string; // used for condition branches
  label?: string;        // optional UI label
};

export type FlowDefinition = {
  version: 1;
  nodes: FlowNode[];
  edges: FlowEdge[];
};