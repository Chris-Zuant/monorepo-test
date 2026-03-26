import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DevToolWaitLink } from '../api/devTool.api';

interface DevToolsState {
  currentRunWorkflowId: string | null;
  currentRunWaitLinks: DevToolWaitLink[];
}

const initialState: DevToolsState = {
  currentRunWorkflowId: null,
  currentRunWaitLinks: [],
};

const devToolsSlice = createSlice({
  name: 'devTools',
  initialState,
  reducers: {
    setCurrentRunExecution: (
      state,
      action: PayloadAction<{
        workflowId: string;
        waitLinks: DevToolWaitLink[];
      }>
    ) => {
      state.currentRunWorkflowId = action.payload.workflowId;
      state.currentRunWaitLinks = action.payload.waitLinks;
    },
    clearCurrentRunExecution: (state) => {
      state.currentRunWorkflowId = null;
      state.currentRunWaitLinks = [];
    },
    removeWaitLink: (state, action: PayloadAction<string>) => {
      state.currentRunWaitLinks = state.currentRunWaitLinks.filter(
        (waitLink) => waitLink.nodeId !== action.payload
      );

      if (state.currentRunWaitLinks.length === 0) {
        state.currentRunWorkflowId = null;
      }
    },
  },
});

export const {
  setCurrentRunExecution,
  clearCurrentRunExecution,
  removeWaitLink,
} = devToolsSlice.actions;

export default devToolsSlice.reducer;
