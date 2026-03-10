import {
  useMutation,
  useQuery,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query';
import type { Form } from '../form-builder.types';
import { fetchForms, saveForm } from '../api';

// export const formBuilderQueryKeys = {
//   all: ['form-builder'] as const,
//   forms: () => [...formBuilderQueryKeys.all, 'forms'] as const,
// };

export const useFormsQuery = (
  options?: Omit<UseQueryOptions<Form[], Error>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['meow'],
    queryFn: fetchForms,
    ...options,
  });

export const useSaveFormMutation = (
  options?: UseMutationOptions<Form, Error, Partial<Form>>
) =>
  useMutation({
    mutationFn: saveForm,
    ...options,
  });
