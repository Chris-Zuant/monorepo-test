import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './theme.slice';
import conditionalLogicReducer from '@features/conditional-logic/store/conditional-logic.slice';
import integrationsReducer from '@features/integrations/store/integrations.slice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    conditionalLogic: conditionalLogicReducer,
    integrations: integrationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
