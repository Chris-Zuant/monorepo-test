import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ReactFlow,
  addEdge as addEdgeUtil,
  Background,
  Controls,
  MiniMap,
  type Edge,
  type Node,
  useEdgesState,
  useNodesState,
  type Connection,
} from "@xyflow/react";
import {
  Toaster,
  type ToasterNotification,
} from "@/core/shadcn/components/ui/Toaster.component";
import { nodeTypes } from './nodes';
import type { RootState } from '@app/providers/theme/store';
import { setEdges, setNodes } from "../../store/integrations.slice";
import { NodeConfigEditorModal } from "./modals/nodeConfigEditorModal.component";
import type { ReactFlowNodeData } from "../../models/reactFlowNodeData.types";
import { DeletableEdge } from "./edges/DeletableEdge.component";
import { getConnectionValidationError } from "../../functions/edgeConnectionValidation";

const edgeTypes = {
  deletableEdge: DeletableEdge,
}

function withDeletableEdgeType(edges: Edge[]) {
  return edges.map((edge) => ({
    ...edge,
    type: edge.type ?? "deletableEdge",
  }))
}

export function LogicTreeCanvas() {
  const dispatch = useDispatch();
  const reduxNodes = useSelector((state: RootState) => state.integrations.nodes);
  const reduxEdges = useSelector((state: RootState) => state.integrations.edges);
  const [nodes, setLocalNodes, onNodesChange] = useNodesState(reduxNodes);
  const [edges, setLocalEdges, onEdgesChange] = useEdgesState(withDeletableEdgeType(reduxEdges));
  const [, startTransition] = useTransition();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [validationNotification, setValidationNotification] =
    useState<ToasterNotification | null>(null);

  useEffect(() => {
    setLocalNodes(reduxNodes);
  }, [reduxNodes, setLocalNodes]);

  useEffect(() => {
    setLocalEdges(withDeletableEdgeType(reduxEdges));
  }, [reduxEdges, setLocalEdges]);

  const onNodesChangeHandler = useCallback((changes: any) => {
    onNodesChange(changes);
  }, [onNodesChange]);

  const onEdgesChangeHandler = useCallback((changes: any) => {
    onEdgesChange(changes);
  }, [onEdgesChange]);

  const selectedNode = useMemo(() => {
    if (!selectedNodeId) {
      return null;
    }

    return reduxNodes.find((node) => node.id === selectedNodeId) ?? null;
  }, [reduxNodes, selectedNodeId]);

  const handleDragStop = useCallback(() => {

    startTransition(() => {
      dispatch(setNodes(nodes));
    });
  }, [dispatch, nodes, startTransition]);

  const handleNodeClick = useCallback((_: React.MouseEvent, node: Node<ReactFlowNodeData>) => {
    setSelectedNodeId(node.id);
  }, []);

  const handleModalOpenChange = useCallback((open: boolean) => {
    if (!open) {
      setSelectedNodeId(null);
    }
  }, []);

  // const isValidConnection = useCallback<IsValidConnection>(
  //   (connection) =>
  //     "source" in connection && "target" in connection
  //       ? getConnectionValidationError(connection, nodes) === null
  //       : false,
  //   [nodes]
  // )

  const onConnect = useCallback(
    (connection: Connection) => {
      const validationError = getConnectionValidationError(connection, nodes, edges)
      if (validationError) {
        setValidationNotification({
          id: `invalid-connection-${Date.now()}`,
          title: "Invalid connection",
          description: validationError,
          variant: "error",
        })
        return
      }

      const newEdges = addEdgeUtil({ ...connection, type: "deletableEdge" }, edges);
      setLocalEdges(newEdges);

      startTransition(() => {
        dispatch(setEdges(newEdges));
      });
    },
    [dispatch, edges, nodes, setLocalEdges, startTransition]
  );

  return (
    <div className="h-full w-full">
      <Toaster
        notification={validationNotification}
        onNotificationHandled={(notificationId) => {
          setValidationNotification((currentNotification) =>
            currentNotification?.id === notificationId ? null : currentNotification
          )
        }}
      />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChangeHandler}
        onEdgesChange={onEdgesChangeHandler}
        onNodeDragStop={handleDragStop}
        onNodeClick={handleNodeClick}
        // isValidConnection={isValidConnection}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>

      <NodeConfigEditorModal
        node={selectedNode}
        open={selectedNode !== null}
        onOpenChange={handleModalOpenChange}
      />
    </div>
  );
}
