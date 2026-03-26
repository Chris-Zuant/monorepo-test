import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IntegrationGraphDefinition } from '@monorepo/shared';
import type { Node, Edge } from '@xyflow/react';
import { toReactFlow } from '../functions/reactFlowToGraphConversion';
import type { ReactFlowNodeData } from '../models/reactFlowNodeData.types';

export interface IntegrationsState {
  id: string;
  name: string;
  nodes: Node<ReactFlowNodeData>[];
  edges: Edge[];
}

const createInitialState = (id?: string): IntegrationsState => ({
  id: id ?? (globalThis.crypto?.randomUUID?.() ?? `integration-${Date.now()}`),
  name: '',
  nodes: [],
  edges: [],
});

const initialState: IntegrationsState = createInitialState();

export const integrationsSlice = createSlice({
  name: 'integrations',
  initialState,
  reducers: {
    setIntegrationGraph: (
      state,
      action: PayloadAction<IntegrationGraphDefinition>
    ) => {
      const graph = action.payload;
      const { nodes, edges } = toReactFlow(graph);

      state.id = graph.id;
      state.name = graph.name;
      state.nodes = nodes;
      state.edges = edges;
    },
    initializeNewIntegrationGraph: (state, action: PayloadAction<{ id?: string } | undefined>) => {
      const nextState = createInitialState(action.payload?.id);
      state.id = nextState.id;
      state.name = nextState.name;
      state.nodes = nextState.nodes;
      state.edges = nextState.edges;
    },
    setIntegrationName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setNodes: (state, action: PayloadAction<Node<ReactFlowNodeData>[]>) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
    },
    addNode: (state, action: PayloadAction<Node<ReactFlowNodeData>>) => {
      state.nodes.push(action.payload);
    },
    updateNodeConfig: (
      state,
      action: PayloadAction<{
        nodeId: string;
        name: string;
        config: Record<string, unknown>;
      }>
    ) => {
      const node = state.nodes.find((entry) => entry.id === action.payload.nodeId);

      if (!node) {
        return;
      }

      node.data = {
        ...node.data,
        name: action.payload.name,
        config: action.payload.config,
      };
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

export const {
  setIntegrationGraph,
  initializeNewIntegrationGraph,
  setIntegrationName,
  setNodes,
  setEdges,
  addNode,
  updateNodeConfig,
  addEdge,
  removeNode,
  removeEdge
} = integrationsSlice.actions;
export default integrationsSlice.reducer;
