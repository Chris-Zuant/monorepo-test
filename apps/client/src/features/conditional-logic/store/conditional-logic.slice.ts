import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Node, Edge } from '@xyflow/react';

export interface ConditionalLogicState {
  nodes: Node[];
  edges: Edge[];
}

const initialState: ConditionalLogicState = {
  nodes: [
    { id: '1', position: { x: 0, y: 0 }, data: { label: 'Start' }, type: 'start' },
    { id: '2', position: { x: 200, y: 100 }, data: { label: 'Node 2' }, type: 'default' },
  ],
  edges: [{ id: 'e1-2', source: '1', target: '2' }],
};

export const conditionalLogicSlice = createSlice({
  name: 'conditionalLogic',
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<Node[]>) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
    },
    addNode: (state, action: PayloadAction<Node>) => {
      state.nodes.push(action.payload);
    },
    addEdge: (state, action: PayloadAction<Edge>) => {
      state.edges.push(action.payload);
    },
    removeNode: (state, action: PayloadAction<string>) => {
      state.nodes = state.nodes.filter((node) => node.id !== action.payload);
      // Also remove edges connected to this node
      state.edges = state.edges.filter(
        (edge) => edge.source !== action.payload && edge.target !== action.payload
      );
    },
    removeEdge: (state, action: PayloadAction<string>) => {
      state.edges = state.edges.filter((edge) => edge.id !== action.payload);
    },
  },
});

export const { setNodes, setEdges, addNode, addEdge, removeNode, removeEdge } =
  conditionalLogicSlice.actions;
export default conditionalLogicSlice.reducer;
