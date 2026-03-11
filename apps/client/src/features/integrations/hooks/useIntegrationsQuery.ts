import {
  useMutation,
  useQuery,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query';
import type { IntegrationGraphDefinition } from '@monorepo/shared';
import { fetchIntegrations, runIntegration, updateIntegration } from '../api';
import { integrationTemporalTest } from '../api/integrationTest.api';

// export const integrationsQueryKeys = {
//   all: ['integrations'] as const,
//   list: () => [...integrationsQueryKeys.all, 'list'] as const,
//   temporalTest: () => [...integrationsQueryKeys.all, 'temporal-test'] as const,
// };

export const useIntegrationsQuery = (
  options?: Omit<UseQueryOptions<IntegrationGraphDefinition[], Error>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['integrations', 'list'],
    queryFn: fetchIntegrations,
    ...options,
  });

export const useUpdateIntegrationMutation = (
  options?: UseMutationOptions<boolean, Error, IntegrationGraphDefinition>
) =>
  useMutation({
    mutationFn: updateIntegration,
    ...options,
  });

export const useRunIntegrationMutation = (
  options?: UseMutationOptions<{ id: string }, Error, { id: string }>
) =>
  useMutation({
    mutationFn: runIntegration,
    ...options,
  });

export const useIntegrationTemporalTestMutation = (
  options?: UseMutationOptions<Awaited<ReturnType<typeof integrationTemporalTest>>, Error, void>
) =>
  useMutation({
    mutationFn: integrationTemporalTest,
    ...options,
  });
