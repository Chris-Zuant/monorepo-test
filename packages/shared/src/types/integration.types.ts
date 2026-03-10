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

export type IntegrationNodeType =
  (typeof IntegrationNodeType)[keyof typeof IntegrationNodeType]

  export interface IntegrationGraphDefinition {
  id: string
  name: string
  nodes: IntegrationGraphNode[]
  edges: IntegrationGraphEdge[]
}

export interface IntegrationGraphNode {
  id: string
  type: IntegrationNodeType
  name: string
  position: {
    x: number
    y: number
  }
  config: Record<string, unknown>
}

export interface IntegrationGraphEdge {
  id: string
  source: string
  sourceHandle?: string
  target: string
  targetHandle?: string
  label?: string
}
