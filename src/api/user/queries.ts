import { createQuery } from 'react-query-kit';
import { getAdminById, getUsers } from './requests';
import type { IAdmin, IAdminQuery, IAdminResponse } from './types';

export const useUsersQuery = createQuery<IAdminResponse, Partial<IAdminQuery>>({
  queryKey: ['admin/users'],
  fetcher: (params) => getUsers(params),
});

export const useAdminByIdQuery = createQuery<IAdmin, string>({
  queryKey: ['admin/user'],
  fetcher: (id) => getAdminById(id),
});
