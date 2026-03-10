import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight, X } from 'lucide-react';
import { CoreButton } from '@/core/components/buttons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/core/shadcn/components/ui/Tabs.component';
import { ThemeSwitcher } from './ThemeSwitcher.component';

export const DevTools = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('themes');

  return (
    <>
      {/* Toggle Button - Bottom Right */}
      <div style={{ position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 9999 }}>
        <CoreButton
          onClick={() => setIsOpen(!isOpen)}
          title="Toggle DevTools"
        >
          <ChevronRight className={`w-5 h-5 transition-transform ${isOpen ? '' : 'rotate-180'}`} />
        </CoreButton>
      </div>

      {/* Side Panel */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          top: 0,
          zIndex: 9998,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 300ms, background-color 200ms, color 200ms, border-color 200ms'
        }}
        className="shadow-lg bg-background w-100"
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
          <CoreButton
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="sm"
            className="p-0 w-8 h-8"
          >
            <X className="w-4 h-4" />
          </CoreButton>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex h-[calc(100%-65px)] flex-col"
        >
          <div
            style={{
              padding: '1rem',
              borderBottom: '1px solid var(--border-color)',
              transition: 'border-color 200ms'
            }}
          >
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="themes">
                {t('devtools.themesTab')}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="themes" className="overflow-y-auto pb-8">
            <ThemeSwitcher />
          </TabsContent>
        </Tabs>
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
