import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy load user pages
const ConditionalLogicPage = lazy(() => import('./pages/conditional-logic.page'));

// User feature routes
export const condLogicRoutes: RouteObject[] = [
  {
    path: '/conditional-logic',
    element: <ConditionalLogicPage />,
  },
];

export default condLogicRoutes;

