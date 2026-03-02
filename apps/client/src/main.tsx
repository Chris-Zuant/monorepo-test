import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.component';
import './app/providers/i18n'
import { AppProviders } from './app/providers/App.provider';
import "@xyflow/react/dist/style.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
)
