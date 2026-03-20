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
import { nodeTypes } from './nodes';
import type { RootState } from '@app/providers/theme/store';
import { setEdges, setNodes } from "../../store/integrations.slice";
import { NodeConfigEditorModal } from "./modals/nodeConfigEditorModal.component";
import type { ReactFlowNodeData } from "../../models/reactFlowNodeData.types";
import { DeletableEdge } from "./edges/DeletableEdge.component";

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

  const onConnect = useCallback(
    (connection: Connection) => {
      const newEdges = addEdgeUtil({ ...connection, type: "deletableEdge" }, edges);
      setLocalEdges(newEdges);

      startTransition(() => {
        dispatch(setEdges(newEdges));
      });
    },
    [dispatch, edges, setLocalEdges, startTransition]
  );

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChangeHandler}
        onEdgesChange={onEdgesChangeHandler}
        onNodeDragStop={handleDragStop}
        onNodeClick={handleNodeClick}
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
