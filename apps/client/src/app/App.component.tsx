import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '@app/layout/header';
import { DevTools } from '@app/layout/devtools';
import { routes } from '@app/routes/routes.config';
import { RequireAuth } from '@app/providers/auth';
import './App.css';

function AppShell() {
  const { t } = useTranslation();
  const location = useLocation();
  const publicRoutes = new Set(['/login', '/login/sso']);
  const isPublicRoute = publicRoutes.has(location.pathname);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground transition-colors">
      {!isPublicRoute ? <Header /> : null}
      <main className="flex-1 w-full">
        <Suspense fallback={<div className="p-4">{t('common.loading')}</div>}>
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  publicRoutes.has(route.path ?? '')
                    ? route.element
                    : <RequireAuth>{route.element}</RequireAuth>
                }
              />
            ))}
            <Route path="/" element={<Navigate to="/users" replace />} />
          </Routes>
        </Suspense>
      </main>
      {!isPublicRoute ? <DevTools /> : null}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;
