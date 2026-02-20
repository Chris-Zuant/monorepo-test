import type { RouteObject } from 'react-router-dom';
import { usersRoutes } from '@/features/account/account.routes';
import { formBuilderRoutes } from '@features/form-builder/form-builder.routes';
import { integrationsRoutes } from '@features/integrations/integrations.routes';

// Aggregate all feature routes
export const routes: RouteObject[] = [
  ...usersRoutes,
  ...formBuilderRoutes,
  ...integrationsRoutes,
  // Add more feature routes here as they're developed
];


