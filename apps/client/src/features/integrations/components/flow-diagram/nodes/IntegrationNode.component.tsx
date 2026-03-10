import { memo } from "react"
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react"
import type { ReactFlowNodeData } from "@/features/integrations/models/reactFlowNodeData.types"

type IntegrationFlowNode = Node<ReactFlowNodeData, "integrationNode">

export const IntegrationNode = memo(({ data }: NodeProps<IntegrationFlowNode>) => {
  const nodeData = data as ReactFlowNodeData
  const Icon = nodeData.icon

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
      <Handle
        type="target"
        position={Position.Left}
        className="size-2 border-2 border-background bg-primary"
      />
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4" />
        </div>
        <span className="text-sm font-medium">{nodeData.label}</span>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="size-2 border-2 border-background bg-primary"
      />
    </div>
  )
})

IntegrationNode.displayName = "IntegrationNode"
