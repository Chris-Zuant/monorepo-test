import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, ChevronRight, ExternalLink, X } from 'lucide-react';
import type { RootState } from '@app/providers/theme/store';
import { CoreButton } from '@/core/components/buttons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/core/shadcn/components/ui/Tabs.component';
import { removeWaitLink } from '../store/devTools.slice';
import { useTriggerWaitLinkMutation } from '../hooks/useDevTools.hook';
import { ThemeSwitcher } from './ThemeSwitcher.component';

export const DevTools = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('themes');
  const dispatch = useDispatch();
  const waitLinks = useSelector((state: RootState) => state.devTools.currentRunWaitLinks);
  const workflowId = useSelector((state: RootState) => state.devTools.currentRunWorkflowId);
  const triggerWaitLinkMutation = useTriggerWaitLinkMutation({
    onSuccess: (_response, waitLinkUrl) => {
      const clickedWaitLink = waitLinks.find((waitLink) => waitLink.url === waitLinkUrl);
      if (clickedWaitLink) {
        dispatch(removeWaitLink(clickedWaitLink.nodeId));
      }
    },
  });

  const activeWaitLinkUrl = useMemo(
    () => triggerWaitLinkMutation.variables ?? null,
    [triggerWaitLinkMutation.variables]
  );

  const handleTriggerWaitLink = (waitLinkUrl: string) => {
    if (triggerWaitLinkMutation.isPending) {
      return;
    }

    triggerWaitLinkMutation.mutate(waitLinkUrl);
  };

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
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="themes">
                {t('devtools.themesTab')}
              </TabsTrigger>
              <TabsTrigger value="waitLinks">
                Wait Links
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="themes" className="overflow-y-auto pb-8">
            <ThemeSwitcher />
          </TabsContent>

          <TabsContent value="waitLinks" className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Current Run</h3>
                <p className="text-xs text-muted-foreground">
                  {workflowId ? `Workflow: ${workflowId}` : 'Run an integration to generate wait links.'}
                </p>
              </div>

              {waitLinks.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
                  No pending wait links for the current execution.
                </div>
              ) : (
                <div className="space-y-3">
                  {waitLinks.map((waitLink) => {
                    const isPending =
                      triggerWaitLinkMutation.isPending && activeWaitLinkUrl === waitLink.url;

                    return (
                      <div
                        key={waitLink.nodeId}
                        className="rounded-xl border border-border bg-card p-3"
                      >
                        <div className="mb-2">
                          <div className="text-sm font-medium text-card-foreground">
                            {waitLink.label}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Node: {waitLink.nodeId}
                          </div>
                        </div>

                        <CoreButton
                          variant="outline"
                          className="w-full justify-center gap-2"
                          onClick={() => handleTriggerWaitLink(waitLink.url)}
                          disabled={isPending}
                        >
                          {isPending ? (
                            <>
                              <CheckCircle2 className="size-4 animate-pulse" />
                              <span>Triggering...</span>
                            </>
                          ) : (
                            <>
                              <ExternalLink className="size-4" />
                              <span>Trigger Link</span>
                            </>
                          )}
                        </CoreButton>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
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
