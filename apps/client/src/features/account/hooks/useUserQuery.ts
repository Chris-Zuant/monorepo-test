import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { User } from '@monorepo/shared';
import { fetchUser } from '../api/user.api';

// export const userQueryKeys = {
//   all: ['users'] as const,
//   current: () => [...userQueryKeys.all, 'current'] as const,
// };

export const useUserQuery = (
  options?: Omit<UseQueryOptions<User | null, Error>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['meow'],
    queryFn: fetchUser,
    ...options,
  });
