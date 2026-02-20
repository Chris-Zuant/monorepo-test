import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy load user pages
const UsersPage = lazy(() => import('./pages/Users.page'));

// User feature routes
export const usersRoutes: RouteObject[] = [
  {
    path: '/users',
    element: <UsersPage />,
  },
];

export default usersRoutes;

