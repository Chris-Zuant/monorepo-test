import { useCallback, useState, useEffect } from "react";
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
  type Node,
} from "@xyflow/react";
import { NODE_TYPES, nodeTypes } from './nodes';
import { setNodes, setEdges, addNode } from '../../store';
import type { RootState } from '@app/providers/theme/store';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/core/components/shadcn';
import { Button } from '@/core/components/shadcn';

export function LogicTreeCanvas() {
  const dispatch = useDispatch();
  const reduxNodes = useSelector((state: RootState) => state.conditionalLogic.nodes);
  const reduxEdges = useSelector((state: RootState) => state.conditionalLogic.edges);
  const [nodes, setLocalNodes, onNodesChange] = useNodesState(reduxNodes);
  const [edges, setLocalEdges, onEdgesChange] = useEdgesState(reduxEdges);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sync Redux state changes to local state
  useEffect(() => {
    if (JSON.stringify(nodes) !== JSON.stringify(reduxNodes)) {
      setLocalNodes(reduxNodes);
    }
  }, [reduxNodes]);

  useEffect(() => {
    if (JSON.stringify(edges) !== JSON.stringify(reduxEdges)) {
      setLocalEdges(reduxEdges);
    }
  }, [reduxEdges]);

  const onNodesChangeHandler = useCallback((changes: any) => {
    onNodesChange(changes);
  }, [onNodesChange]);

  const onEdgesChangeHandler = useCallback((changes: any) => {
    onEdgesChange(changes);
  }, [onEdgesChange]);

  // Update Redux when nodes change
  useEffect(() => {
    dispatch(setNodes(nodes));
  }, [nodes, dispatch]);

  // Update Redux when edges change
  useEffect(() => {
    dispatch(setEdges(edges));
  }, [edges, dispatch]);

  const onConnect = useCallback(
    (connection: Connection) => {
      const newEdges = addEdgeUtil(connection, edges);
      onEdgesChange([{ type: 'reset', payload: newEdges }] as any);
    },
    [edges, onEdgesChange]
  );

  const handleAddNode = useCallback((nodeTypeId: string) => {
    const nodeLabel = NODE_TYPES.find(t => t.id === nodeTypeId)?.label || 'New Node';
    const newNodeId = `node-${Date.now()}`;
    const newNode: Node = {
      id: newNodeId,
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: { label: nodeLabel },
      type: nodeTypeId,
    };
    dispatch(addNode(newNode));
    setIsDropdownOpen(false);
  }, [dispatch]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}>
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="default">+ Add Node</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {NODE_TYPES.map((nodeType) => (
              <DropdownMenuItem
                key={nodeType.id}
                onClick={() => handleAddNode(nodeType.id)}
              >
                {nodeType.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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