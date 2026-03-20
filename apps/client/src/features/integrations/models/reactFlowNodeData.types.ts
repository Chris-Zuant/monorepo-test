import type {
  IntegrationNodeType,
  PortDefinition,
  RelationshipNodeType,
} from "@monorepo/shared"
import type { LucideIcon } from "lucide-react"

export interface NodeConfigOption {
  label: string
  value: string
}

export interface NodeConfigFieldDefinition {
  key: string
  label: string
  kind: "text" | "number" | "select" | "json"
  required?: boolean
  defaultValue?: unknown
  options?: NodeConfigOption[]
}

export interface ReactFlowNodeData extends Record<string, unknown> {
  nodeId: string
  name: string
  label: string
  type: IntegrationNodeType | RelationshipNodeType
  nodeKind: "integration" | "relationship"
  description: string
  config: Record<string, unknown>
  category: string
  activityName?: string
  inputs: PortDefinition[]
  outputs: PortDefinition[]
  configSchema: NodeConfigFieldDefinition[]
}

export interface IntegrationNodeDefinition {
  label: string
  type: IntegrationNodeType
  description: string
  category: string
  activityName: string
  icon: LucideIcon
  inputs: PortDefinition[]
  outputs: PortDefinition[]
  configSchema: NodeConfigFieldDefinition[]
}

export interface RelationshipNodeDefinition {
  label: string
  type: RelationshipNodeType
  description: string
  category: "relationship"
  icon: LucideIcon
  inputs: PortDefinition[]
  outputs: PortDefinition[]
  configSchema: NodeConfigFieldDefinition[]
}
