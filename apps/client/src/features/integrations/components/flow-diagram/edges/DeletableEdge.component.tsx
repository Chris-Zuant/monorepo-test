import { memo } from "react"
import { useDispatch } from "react-redux"
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  type Edge,
  type EdgeProps,
} from "@xyflow/react"
import { X } from "lucide-react"
import { removeEdge } from "../../../store/integrations.slice"

type DeletableFlowEdge = Edge<Record<string, never>, "deletableEdge">

export const DeletableEdge = memo(
  ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  }: EdgeProps<DeletableFlowEdge>) => {
    const dispatch = useDispatch()
    const [edgePath, labelX, labelY] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    })

    return (
      <>
        <BaseEdge id={id} path={edgePath} />
        <EdgeLabelRenderer>
          <button
            type="button"
            className="nodrag nopan absolute flex size-6 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm transition-colors hover:border-destructive hover:cursor-pointer"
            style={{
              pointerEvents: "all",
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              zIndex: 10,
            }}
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              dispatch(removeEdge(id))
            }}
            title="Delete edge"
          >
            <X className="size-3.5" />
          </button>
        </EdgeLabelRenderer>
      </>
    )
  }
)

DeletableEdge.displayName = "DeletableEdge"
