import type { IntegrationNodeType } from "@monorepo/shared"
import type { LucideIcon } from "lucide-react"

export interface NodePortDefinition {
  id: string
  label: string
  portType: "input" | "output"
  dataType: string
}

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
  type: IntegrationNodeType
  description: string
  config: Record<string, unknown>
  category: string
  activityName: string
  inputs: NodePortDefinition[]
  outputs: NodePortDefinition[]
  configSchema: NodeConfigFieldDefinition[]
}

export interface IntegrationNodeDefinition {
  label: string
  type: IntegrationNodeType
  description: string
  category: string
  activityName: string
  icon: LucideIcon
  inputs: NodePortDefinition[]
  outputs: NodePortDefinition[]
  configSchema: NodeConfigFieldDefinition[]
}
