import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy load user pages
const LoginPage = lazy(() => import('./pages/Login.page'));
const WorkSsoPage = lazy(() => import('./pages/WorkSso.page'));
const OrganizationsPage = lazy(() => import('./pages/Organizations.page'));
const PreferencesPage = lazy(() => import('./pages/Preferences.page'));
const ProfilePage = lazy(() => import('./pages/Profile.page'));
const SettingsPage = lazy(() => import('./pages/Settings.page'));
const UsersPage = lazy(() => import('./pages/Users.page'));

// User feature routes
export const usersRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/login/sso',
    element: <WorkSsoPage />,
  },
  {
    path: '/users',
    element: <UsersPage />,
  },
  {
    path: '/account/organizations',
    element: <OrganizationsPage />,
  },
  {
    path: '/account/profile',
    element: <ProfilePage />,
  },
  {
    path: '/account/settings',
    element: <SettingsPage />,
  },
  {
    path: '/account/preferences',
    element: <PreferencesPage />,
  },
];

export default usersRoutes;
