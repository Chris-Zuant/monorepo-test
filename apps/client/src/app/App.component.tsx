import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '@app/layout/header';
import { DevTools } from '@app/layout/devtools';
import { routes } from '@app/routes/routes.config';
import './App.css';

function App() {
  const { t } = useTranslation();

  return (
    <>
      <Router>
        <div className="flex flex-col min-h-screen w-full" style={{
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-primary)',
          transition: 'background-color 200ms, color 200ms'
        }}>
          <Header />
          <main className="flex-1 w-full">
            <Suspense fallback={<div className="p-4">{t('common.loading')}</div>}>
              <Routes>
                {routes.map((route, index) => (
                  <Route key={index} path={route.path} element={route.element} />
                ))}
                {/* Default redirect to home or users page */}
                <Route path="/" element={<Navigate to="/users" replace />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
      <DevTools />
    </>
  );
}

export default App;

