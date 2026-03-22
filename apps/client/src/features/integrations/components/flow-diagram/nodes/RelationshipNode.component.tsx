import { memo } from "react"
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react"
import { Workflow } from "lucide-react"
import type { ReactFlowNodeData } from "@/features/integrations/models/reactFlowNodeData.types"

type RelationshipFlowNode = Node<ReactFlowNodeData, "relationshipNode">

function getHandleOffset(index: number, total: number) {
  return `${((index + 1) / (total + 1)) * 100}%`
}

export const RelationshipNode = memo(({ data }: NodeProps<RelationshipFlowNode>) => {
  const nodeData = data as ReactFlowNodeData
  const mode =
    nodeData.config && typeof nodeData.config === "object" && "mode" in nodeData.config
      ? String(nodeData.config.mode)
      : null

  return (
    <div
      className="min-w-44 cursor-pointer rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sky-950 shadow-sm transition-colors hover:border-sky-400 hover:bg-sky-100"
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
          className="size-2 border-2 border-background bg-sky-500"
        />
      ))}

      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-sky-200 text-sky-700">
          <Workflow className="size-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{nodeData.label}</span>
          <span className="text-xs text-sky-700/80">{nodeData.type}</span>
          {mode ? <span className="text-xs text-sky-400">{mode}</span> : null}
        </div>
      </div>

      {nodeData.outputs.map((output, index) => (
        <Handle
          key={output.id}
          id={output.id}
          type="source"
          position={Position.Right}
          style={{ top: getHandleOffset(index, nodeData.outputs.length) }}
          className="size-2 border-2 border-background bg-sky-500"
        />
      ))}
    </div>
  )
})

RelationshipNode.displayName = "RelationshipNode"
