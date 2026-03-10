import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Node, Edge } from '@xyflow/react';
import type { ReactFlowNodeData } from '../models/reactFlowNodeData.types';
import { NODE_DEFINITIONS } from '../components/flow-diagram/nodes';
import { IntegrationNodeType } from '@monorepo/shared';

export interface IntegrationsState {
  nodes: Node[];
  edges: Edge[];
}

const initialState: IntegrationsState = {
  nodes: [
    {
      id: '1',
      position: { x: 80, y: 120 },
      data: {
        nodeId: '1',
        name: 'HTTP Request',
        label: NODE_DEFINITIONS[IntegrationNodeType.HttpRequest].label,
        type: NODE_DEFINITIONS[IntegrationNodeType.HttpRequest].type,
        description: NODE_DEFINITIONS[IntegrationNodeType.HttpRequest].description,
        config: {},
        category: NODE_DEFINITIONS[IntegrationNodeType.HttpRequest].category,
        activityName: NODE_DEFINITIONS[IntegrationNodeType.HttpRequest].activityName,
        icon: NODE_DEFINITIONS[IntegrationNodeType.HttpRequest].icon,
        inputs: NODE_DEFINITIONS[IntegrationNodeType.HttpRequest].inputs,
        outputs: NODE_DEFINITIONS[IntegrationNodeType.HttpRequest].outputs,
        configSchema: NODE_DEFINITIONS[IntegrationNodeType.HttpRequest].configSchema,
      } satisfies ReactFlowNodeData,
      type: 'integrationNode',
    },
    {
      id: '2',
      position: { x: 360, y: 120 },
      data: {
        nodeId: '2',
        name: 'Transform',
        label: NODE_DEFINITIONS[IntegrationNodeType.Transform].label,
        type: NODE_DEFINITIONS[IntegrationNodeType.Transform].type,
        description: NODE_DEFINITIONS[IntegrationNodeType.Transform].description,
        config: {},
        category: NODE_DEFINITIONS[IntegrationNodeType.Transform].category,
        activityName: NODE_DEFINITIONS[IntegrationNodeType.Transform].activityName,
        icon: NODE_DEFINITIONS[IntegrationNodeType.Transform].icon,
        inputs: NODE_DEFINITIONS[IntegrationNodeType.Transform].inputs,
        outputs: NODE_DEFINITIONS[IntegrationNodeType.Transform].outputs,
        configSchema: NODE_DEFINITIONS[IntegrationNodeType.Transform].configSchema,
      } satisfies ReactFlowNodeData,
      type: 'integrationNode',
    },
  ],
  edges: [{ id: 'e1-2', source: '1', target: '2' }],
};

export const integrationsSlice = createSlice({
  name: 'integrations',
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

export const { setNodes, setEdges, addNode, addEdge, removeNode, removeEdge } = integrationsSlice.actions;
export default integrationsSlice.reducer;
