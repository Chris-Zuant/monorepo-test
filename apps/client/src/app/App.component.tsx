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
  const isLoginRoute = location.pathname === '/login';

  return (
    <div className="flex flex-col min-h-screen w-full bg-background text-foreground" style={{
      transition: 'background-color 200ms, color 200ms'
    }}>
      {!isLoginRoute ? <Header /> : null}
      <main className="flex-1 w-full">
        <Suspense fallback={<div className="p-4">{t('common.loading')}</div>}>
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  route.path === '/login'
                    ? route.element
                    : <RequireAuth>{route.element}</RequireAuth>
                }
              />
            ))}
            <Route path="/" element={<Navigate to="/users" replace />} />
          </Routes>
        </Suspense>
      </main>
      {!isLoginRoute ? <DevTools /> : null}
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
