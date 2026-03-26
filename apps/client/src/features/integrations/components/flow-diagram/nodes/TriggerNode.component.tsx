import { memo } from "react"
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react"
import type { TriggerNodeType } from "@monorepo/shared"
import type { ReactFlowNodeData } from "@/features/integrations/models/reactFlowNodeData.types"
import { TRIGGER_NODE_DEFINITIONS } from "./index"

type TriggerNodeData = ReactFlowNodeData & {
  nodeKind: "trigger"
  type: TriggerNodeType
}

type TriggerFlowNode = Node<TriggerNodeData, "triggerNode">

function getHandleOffset(index: number, total: number) {
  return `${((index + 1) / (total + 1)) * 100}%`
}

function getHandleLabel(port: TriggerNodeData["outputs"][number]) {
  return port.dataType ?? "any"
}

export const TriggerNode = memo(({ data }: NodeProps<TriggerFlowNode>) => {
  const nodeData = data as TriggerNodeData
  const Icon = TRIGGER_NODE_DEFINITIONS[nodeData.type]?.icon
  const nodeTitle = nodeData.name || nodeData.label

  return (
    <div
      className="min-w-44 cursor-pointer rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-950 shadow-sm transition-colors hover:border-emerald-400 hover:bg-emerald-100"
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
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-200 text-emerald-700">
          {Icon ? <Icon className="size-4" /> : null}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{nodeTitle}</span>
          <span className="text-xs text-emerald-700/80">{nodeData.type}</span>
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
            className="pointer-events-auto size-2 border-2 border-background bg-emerald-500"
          />
          <span className="translate-x-[calc(100%+0.5rem)] rounded bg-background px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-700 shadow-sm whitespace-nowrap">
            {getHandleLabel(output)}
          </span>
        </div>
      ))}
    </div>
  )
})

TriggerNode.displayName = "TriggerNode"
