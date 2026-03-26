import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { User } from '@monorepo/shared';
import { fetchCurrentAuthMethods, fetchCurrentUser, fetchUsers } from '../api/user.api';

// export const userQueryKeys = {
//   all: ['users'] as const,
//   current: () => [...userQueryKeys.all, 'current'] as const,
// };

export const useUserQuery = (
  options?: Omit<UseQueryOptions<User | null, Error>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['account', 'current-user'],
    queryFn: fetchCurrentUser,
    ...options,
  });

export const useAuthMethodsQuery = (
  options?: Omit<UseQueryOptions<string[], Error>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['account', 'auth-methods'],
    queryFn: fetchCurrentAuthMethods,
    ...options,
  });

export const useUsersQuery = (
  options?: Omit<UseQueryOptions<User[], Error>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['account', 'users'],
    queryFn: fetchUsers,
    ...options,
  });
