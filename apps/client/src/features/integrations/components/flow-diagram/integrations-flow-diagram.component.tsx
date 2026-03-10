import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ReactFlow,
  addEdge as addEdgeUtil,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
  type Connection,
} from "@xyflow/react";
import { nodeTypes } from './nodes';
import type { RootState } from '@app/providers/theme/store';
import { setEdges, setNodes } from "../../store/integrations.slice";

export function LogicTreeCanvas() {
  const dispatch = useDispatch();
  const reduxNodes = useSelector((state: RootState) => state.integrations.nodes);
  const reduxEdges = useSelector((state: RootState) => state.integrations.edges);
  const [nodes, setLocalNodes, onNodesChange] = useNodesState(reduxNodes);
  const [edges, setLocalEdges, onEdgesChange] = useEdgesState(reduxEdges);

  // Initialize local state from Redux only once
  useEffect(() => {
    setLocalNodes(reduxNodes);
  }, []);

  useEffect(() => {
    setLocalEdges(reduxEdges);
  }, []);

  const onNodesChangeHandler = useCallback((changes: any) => {
    onNodesChange(changes);
  }, [onNodesChange]);

  const onEdgesChangeHandler = useCallback((changes: any) => {
    onEdgesChange(changes);
  }, [onEdgesChange]);

  // Update Redux when nodes change (one-way sync)
  useEffect(() => {
    dispatch(setNodes(nodes));
  }, [nodes, dispatch]);

  // Update Redux when edges change (one-way sync)
  useEffect(() => {
    dispatch(setEdges(edges));
  }, [edges, dispatch]);

  const onConnect = useCallback(
    (connection: Connection) => {
      const newEdges = addEdgeUtil(connection, edges);
      setLocalEdges(newEdges);
    },
    [edges, setLocalEdges]
  );

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChangeHandler}
        onEdgesChange={onEdgesChangeHandler}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
