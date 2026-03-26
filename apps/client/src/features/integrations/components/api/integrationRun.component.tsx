import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@app/providers/theme/store';
import { CoreButton } from '@/core/components';
import { Spinner } from '@/core/shadcn/components/ui/Spinner.component';
import { setCurrentRunExecution } from '@/app/layout/devtools/store/devTools.slice';
import { useRunIntegrationMutation } from '../../hooks';

export const IntegrationRunComponent = () => {
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
    <CoreButton
      variant="default"
      onClick={handleRunIntegration}
      disabled={!integrationId || runIntegrationMutation.isPending}
    >
      {runIntegrationMutation.isPending ? (
        <>
          <Spinner className="size-4" />
          <span>Running...</span>
        </>
      ) : (
        'Run Integration'
      )}
    </CoreButton>
  );
};

export default IntegrationRunComponent;
