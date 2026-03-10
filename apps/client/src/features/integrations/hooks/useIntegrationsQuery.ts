import {
  useMutation,
  useQuery,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query';
import type { Integration } from '../integrations.types';
import { fetchIntegrations, updateIntegration } from '../api';
import { integrationTemporalTest } from '../api/integration.api';

// export const integrationsQueryKeys = {
//   all: ['integrations'] as const,
//   list: () => [...integrationsQueryKeys.all, 'list'] as const,
//   temporalTest: () => [...integrationsQueryKeys.all, 'temporal-test'] as const,
// };

export const useIntegrationsQuery = (
  options?: Omit<UseQueryOptions<Integration[], Error>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['meow'],
    queryFn: fetchIntegrations,
    ...options,
  });

export const useTestIntegrationMutation = (
  options?: UseMutationOptions<boolean, Error, string>
) =>
  useMutation({
    mutationFn: updateIntegration,
    ...options,
  });

export const useIntegrationTemporalTestMutation = (
  options?: UseMutationOptions<Awaited<ReturnType<typeof integrationTemporalTest>>, Error, void>
) =>
  useMutation({
    mutationFn: integrationTemporalTest,
    ...options,
  });
