import { useSelector } from 'react-redux';
import type { RootState } from '@app/providers/theme/store';
import { CoreButton } from '@/core/components';
import { Spinner } from '@/core/shadcn/components/ui/Spinner.component';
import { useRunIntegrationMutation } from '../../hooks';

export const IntegrationRunComponent = () => {
  const integrationId = useSelector((state: RootState) => state.integrations.id);
  const runIntegrationMutation = useRunIntegrationMutation({
    onSuccess: (response) => {
      console.log('runIntegration response', response);
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
