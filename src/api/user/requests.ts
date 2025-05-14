import type { AdminSchema } from '@/modules/AdminManagementPage/libs/validators';
import client from '../axios';
import type { IAdmin, IAdminQuery, IAdminResponse } from './types';

export const getUsers = async (params: Partial<IAdminQuery>): Promise<IAdminResponse> => {
  const { data } = await client({
    url: '/api/admin/users',
    method: 'GET',
    params,
  });
  return data?.data;
};

export const getAdminById = async (id: string): Promise<IAdmin> => {
  const { data } = await client({
    url: `/api/admin/users/${id}`,
    method: 'GET',
  });
  return data?.data;
};

export const createAdmin = async (formData: AdminSchema): Promise<IAdmin> => {
  const { data } = await client({
    url: '/api/admin/users',
    method: 'POST',
    data: formData,
  });
  return data?.data;
};

export const updateAdmin = async ({
  id,
  formData,
}: {
  id: string;
  formData: AdminSchema;
}): Promise<IAdmin> => {
  const { data } = await client({
    url: `/api/admin/users/${id}`,
    method: 'PUT',
    data: formData,
  });
  return data?.data;
};

export const deleteAdmin = async (id: string): Promise<void> => {
  const { data } = await client({
    url: `/api/admin/users/${id}`,
    method: 'DELETE',
  });
  return data?.data;
};

export const changeAdminPassword = async ({
  id,
  currentPassword,
  newPassword,
}: {
  id: string;
  currentPassword: string;
  newPassword: string;
}): Promise<void> => {
  const { data } = await client({
    url: `/api/admin/users/${id}/change-password`,
    method: 'POST',
    data: { currentPassword, newPassword },
  });
  return data?.data;
};
