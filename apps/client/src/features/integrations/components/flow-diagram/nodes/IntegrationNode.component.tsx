import { memo } from "react"
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react"
import type { IntegrationNodeType } from "@monorepo/shared"
import type { ReactFlowNodeData } from "@/features/integrations/models/reactFlowNodeData.types"
import { ACTION_NODE_DEFINITIONS } from "./index"

type IntegrationNodeData = ReactFlowNodeData & {
  nodeKind: "integration"
  type: IntegrationNodeType
}

type IntegrationFlowNode = Node<IntegrationNodeData, "integrationNode">

function getHandleOffset(index: number, total: number) {
  return `${((index + 1) / (total + 1)) * 100}%`
}

export const IntegrationNode = memo(({ data }: NodeProps<IntegrationFlowNode>) => {
  const nodeData = data as IntegrationNodeData
  const Icon = ACTION_NODE_DEFINITIONS[nodeData.type]?.icon

  return (
    <div
      className="min-w-40 cursor-pointer rounded-xl border border-border bg-card px-4 py-3 text-card-foreground shadow-sm transition-colors hover:border-primary/40 hover:bg-accent/30"
      onClick={() => console.log(nodeData)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          console.log(nodeData)
        }
      }}
    >
      {nodeData.inputs.map((input, index) => (
        <Handle
          key={input.id}
          id={input.id}
          type="target"
          position={Position.Left}
          style={{ top: getHandleOffset(index, nodeData.inputs.length) }}
          className="size-2 border-2 border-background bg-primary"
        />
      ))}
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {Icon ? <Icon className="size-4" /> : null}
        </div>
        <span className="text-sm font-medium">{nodeData.label}</span>
      </div>
      {nodeData.outputs.map((output, index) => (
        <Handle
          key={output.id}
          id={output.id}
          type="source"
          position={Position.Right}
          style={{ top: getHandleOffset(index, nodeData.outputs.length) }}
          className="size-2 border-2 border-background bg-primary"
        />
      ))}
    </div>
  )
})

IntegrationNode.displayName = "IntegrationNode"
