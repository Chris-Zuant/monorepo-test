import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, ChevronRight, ExternalLink, X } from 'lucide-react';
import type { RootState } from '@app/providers/theme/store';
import { Button, Card, CardContent, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger } from '@/core/shadcn/components/ui';
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
      <div className="fixed bottom-4 right-4 z-[9999]">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          title={t('devtools.toggle')}
          className="shadow-lg"
        >
          <ChevronRight className={`w-5 h-5 transition-transform ${isOpen ? '' : 'rotate-180'}`} />
        </Button>
      </div>

      <div
        className={`fixed inset-y-0 right-0 z-[9998] w-[25rem] border-l border-border bg-background shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <h2 className="text-lg font-semibold text-foreground">{t('devtools.title')}</h2>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex h-[calc(100%-65px)] flex-col"
        >
          <div className="border-b border-border p-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="themes">
                {t('devtools.themesTab')}
              </TabsTrigger>
              <TabsTrigger value="waitLinks">
                {t('devtools.waitLinksTab')}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="themes" className="overflow-y-auto pb-8">
            <ThemeSwitcher />
          </TabsContent>

          <TabsContent value="waitLinks" className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">{t('devtools.currentRun')}</h3>
                <p className="text-xs text-muted-foreground">
                  {workflowId ? t('devtools.currentWorkflow', { workflowId }) : t('devtools.runToGenerateWaitLinks')}
                </p>
              </div>

              {waitLinks.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="pt-4 text-sm text-muted-foreground">
                    {t('devtools.noPendingWaitLinks')}
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {waitLinks.map((waitLink) => {
                    const isPending =
                      triggerWaitLinkMutation.isPending && activeWaitLinkUrl === waitLink.url;

                    return (
                      <Card key={waitLink.nodeId}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">{waitLink.label}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="text-sm font-medium text-card-foreground">
                            {t('devtools.nodeId', { nodeId: waitLink.nodeId })}
                          </div>
                          <Button
                            variant="outline"
                            className="w-full justify-center gap-2"
                            onClick={() => handleTriggerWaitLink(waitLink.url)}
                            disabled={isPending}
                          >
                            {isPending ? (
                              <>
                                <CheckCircle2 className="size-4 animate-pulse" />
                                <span>{t('devtools.triggering')}</span>
                              </>
                            ) : (
                              <>
                                <ExternalLink className="size-4" />
                                <span>{t('devtools.triggerLink')}</span>
                              </>
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[9996] bg-background/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
