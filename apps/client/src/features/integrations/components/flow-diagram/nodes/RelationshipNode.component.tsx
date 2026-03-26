import { memo } from "react"
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react"
import { Workflow } from "lucide-react"
import type { ReactFlowNodeData } from "@/features/integrations/models/reactFlowNodeData.types"

type RelationshipFlowNode = Node<ReactFlowNodeData, "relationshipNode">

function getHandleOffset(index: number, total: number) {
  return `${((index + 1) / (total + 1)) * 100}%`
}

function getHandleLabel(port: ReactFlowNodeData["inputs"][number]) {
  return port.dataType ?? "any"
}

export const RelationshipNode = memo(({ data }: NodeProps<RelationshipFlowNode>) => {
  const nodeData = data as ReactFlowNodeData
  const nodeTitle = nodeData.name || nodeData.label
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
        <div
          key={input.id}
          className="pointer-events-none absolute left-0 flex items-center"
          style={{ top: getHandleOffset(index, nodeData.inputs.length), transform: "translateY(-50%)" }}
        >
          <Handle
            id={input.id}
            type="target"
            position={Position.Left}
            style={{ top: "50%", transform: "translate(-50%, -50%)" }}
            className="pointer-events-auto size-2 border-2 border-background bg-sky-500"
          />
          <span className="-translate-x-[calc(100%+0.5rem)] rounded bg-background px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-sky-700 shadow-sm whitespace-nowrap">
            {getHandleLabel(input)}
          </span>
        </div>
      ))}

      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-sky-200 text-sky-700">
          <Workflow className="size-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{nodeTitle}</span>
          <span className="text-xs text-sky-700/80">{nodeData.type}</span>
          {mode ? <span className="text-xs text-sky-400">{mode}</span> : null}
        </div>
      </div>

      {nodeData.outputs.map((output, index) => (
        <div
          key={output.id}
          className="pointer-events-none absolute right-0 flex items-center"
          style={{ top: getHandleOffset(index, nodeData.outputs.length), transform: "translateY(-50%)" }}
        >
          <Handle
            id={output.id}
            type="source"
            position={Position.Right}
            style={{ top: "50%", transform: "translate(50%, -50%)" }}
            className="pointer-events-auto size-2 border-2 border-background bg-sky-500"
          />
          <span className="translate-x-[calc(100%+0.5rem)] rounded bg-background px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-sky-700 shadow-sm whitespace-nowrap">
            {getHandleLabel(output)}
          </span>
        </div>
      ))}
    </div>
  )
})

RelationshipNode.displayName = "RelationshipNode"
