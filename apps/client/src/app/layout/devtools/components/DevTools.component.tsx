import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight, X } from 'lucide-react';
import { Button } from '@core/components/shadcn/Button.component';
import { ThemeSwitcher } from './ThemeSwitcher.component';

export const DevTools = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('themes');

  return (
    <>
      {/* Toggle Button - Bottom Right */}
      <div style={{ position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 9999 }}>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-12 h-12 p-0 flex items-center justify-center"
          variant="default"
          title="Toggle DevTools"
        >
          <ChevronRight className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {/* Side Panel */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          top: 0,
          width: '20rem',
          zIndex: 9998,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 300ms, background-color 200ms, color 200ms, border-color 200ms',
          backgroundColor: 'var(--bg-primary)',
          borderLeft: '1px solid var(--border-color)',
          color: 'var(--text-primary)',
          boxShadow: 'var(--box-shadow, 0 10px 15px -3px rgba(0, 0, 0, 0.1))'
        }}
        className="shadow-lg"
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem',
          borderBottom: '1px solid var(--border-color)',
          transition: 'border-color 200ms'
        }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-primary)' }}>DevTools</h2>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="sm"
            className="p-0 w-8 h-8"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          padding: '1rem',
          borderBottom: '1px solid var(--border-color)',
          transition: 'border-color 200ms'
        }}>
          <Button
            onClick={() => setActiveTab('themes')}
            variant={activeTab === 'themes' ? 'default' : 'secondary'}
            size="sm"
          >
            {t('devtools.themesTab')}
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-full pb-8">
          {activeTab === 'themes' && <ThemeSwitcher />}
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9996,
            pointerEvents: 'auto'
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
