import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import type { RootState } from '@app/providers/theme/store';
import { Spinner } from '@/core/shadcn/components/ui/Spinner.component';
import { Button } from '@/core/shadcn/components/ui';
import { setCurrentRunExecution } from '@/app/layout/devtools/store/devTools.slice';
import { useRunIntegrationMutation } from '../../hooks';

export const IntegrationRunComponent = () => {
  const { t } = useTranslation('integrations');
  const dispatch = useDispatch();
  const integrationId = useSelector((state: RootState) => state.integrations.id);
  const runIntegrationMutation = useRunIntegrationMutation({
    onSuccess: (response) => {
      console.log('runIntegration response', response);
      dispatch(
        setCurrentRunExecution({
          workflowId: response.workflowId,
          waitLinks: response.waitLinks,
        })
      );
    },
    onError: (error) => {
      console.error('runIntegration error', error);
    },
  });

  const handleRunIntegration = () => {
    if (!integrationId || runIntegrationMutation.isPending) {
      return;
    }

    runIntegrationMutation.mutate({ id: integrationId });
  };

  return (
    <Button
      variant="default"
      onClick={handleRunIntegration}
      disabled={!integrationId || runIntegrationMutation.isPending}
    >
      {runIntegrationMutation.isPending ? (
        <>
          <Spinner className="size-4" />
          <span>{t('integrations.run.running')}</span>
        </>
      ) : (
        t('integrations.run.submit')
      )}
    </Button>
  );
};

export default IntegrationRunComponent;
