import { createQuery } from 'react-query-kit';
import { getAdminById, getAdmins } from './requests';
import type { IAdmin, IAdminQuery, IAdminResponse } from './types';

export const useAdminsQuery = createQuery<IAdminResponse, Partial<IAdminQuery>>({
  queryKey: ['admin/users'],
  fetcher: (params) => getAdmins(params),
});

export const useAdminByIdQuery = createQuery<IAdmin, string>({
  queryKey: ['admin/user'],
  fetcher: (id) => getAdminById(id),
});
