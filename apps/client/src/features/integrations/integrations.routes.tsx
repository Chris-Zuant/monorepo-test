import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy load integrations pages
const IntegrationsPage = lazy(() => import('./pages/Integrations.page'));

// Integrations feature routes
export const integrationsRoutes: RouteObject[] = [
  {
    path: '/integrations',
    element: <IntegrationsPage />,
  },
];

export default integrationsRoutes;


