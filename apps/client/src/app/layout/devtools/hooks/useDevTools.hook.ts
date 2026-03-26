import {
  useMutation,
  type UseMutationOptions,
} from '@tanstack/react-query';
import { triggerWaitLink } from '../api/devTool.api';

export const useTriggerWaitLinkMutation = (
  options?: UseMutationOptions<string, Error, string>
) =>
  useMutation({
    mutationFn: triggerWaitLink,
    ...options,
  });
