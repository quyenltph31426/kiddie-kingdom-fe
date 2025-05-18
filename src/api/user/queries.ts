import { createQuery, createMutation } from 'react-query-kit';
import { getAdminById, getUsers, toggleUserStatus } from './requests';
import type { IAdmin, IAdminQuery, IAdminResponse } from './types';

export const useUsersQuery = createQuery<IAdminResponse, Partial<IAdminQuery>>({
  queryKey: ['admin/users'],
  fetcher: (params) => getUsers(params),
});

export const useAdminByIdQuery = createQuery<IAdmin, string>({
  queryKey: ['admin/user'],
  fetcher: (id) => getAdminById(id),
});

// Thêm mutation để toggle trạng thái người dùng
export const useToggleUserStatusMutation = createMutation<IAdmin, { id: string; isActive: boolean }>({
  mutationFn: ({ id, isActive }) => toggleUserStatus({ id, isActive }),
});
