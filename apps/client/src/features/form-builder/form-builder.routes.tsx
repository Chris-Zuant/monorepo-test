import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy load form-builder pages
const FormBuilderPage = lazy(() => import('./pages/FormBuilder.page'));

// Form builder feature routes
export const formBuilderRoutes: RouteObject[] = [
  {
    path: '/forms',
    element: <FormBuilderPage />,
  },
];

export default formBuilderRoutes;


