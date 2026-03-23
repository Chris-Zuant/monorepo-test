import type {
  IntegrationGraphNodeKind,
  IntegrationNodeType,
  PortDefinition,
  RelationshipNodeType,
  TriggerNodeType,
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
  type: IntegrationNodeType | RelationshipNodeType | TriggerNodeType
  nodeKind: IntegrationGraphNodeKind
  description: string
  config: Record<string, unknown>
  category: string
  activityName?: string
  inputs: PortDefinition[]
  outputs: PortDefinition[]
  configSchema: NodeConfigFieldDefinition[]
}

export interface IntegrationNodeDefinition {
  nodeKind: "action"
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
  nodeKind: "relationship"
  label: string
  type: RelationshipNodeType
  description: string
  category: "relationship"
  icon: LucideIcon
  inputs: PortDefinition[]
  outputs: PortDefinition[]
  configSchema: NodeConfigFieldDefinition[]
}

export interface TriggerNodeDefinition {
  nodeKind: "trigger"
  label: string
  type: TriggerNodeType
  description: string
  category: "trigger"
  activityName: string
  icon: LucideIcon
  inputs: PortDefinition[]
  outputs: PortDefinition[]
  configSchema: NodeConfigFieldDefinition[]
}
