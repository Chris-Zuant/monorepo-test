export type PortDirection = "input" | "output";
export type PortCardinality = "one" | "many";

export interface PortDefinition {
  id: string;
  label: string;
  direction: PortDirection;
  cardinality: PortCardinality;
  dataType?: "any" | "object" | "array" | "string" | "number" | "boolean";
}