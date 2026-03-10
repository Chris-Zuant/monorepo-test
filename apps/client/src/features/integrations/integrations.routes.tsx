import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import IntegrationEditorPage from './pages/integrationEditor.page';

// Lazy load integrations pages
const IntegrationsPage = lazy(() => import('./pages/Integrations.page'));

// Integrations feature routes
export const integrationsRoutes: RouteObject[] = [
  {
    path: '/integrations',
    element: <IntegrationsPage />,
  },
  {
    path: '/integrations/editor',
    element: <IntegrationEditorPage />,
  },
];

export default integrationsRoutes;


