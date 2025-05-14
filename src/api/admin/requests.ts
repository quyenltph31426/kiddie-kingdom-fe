import type { AdminSchema } from '@/modules/AdminManagementPage/libs/validators';
import client from '../axios';
import type { IAdmin, IAdminQuery, IAdminResponse } from './types';

export const getAdmins = async (params: Partial<IAdminQuery>): Promise<IAdminResponse> => {
  const { data } = await client({
    url: '/api/admin/admins',
    method: 'GET',
    params,
  });
  return data?.data;
};

export const getAdminById = async (id: string): Promise<IAdmin> => {
  const { data } = await client({
    url: `/api/admin/admins/${id}`,
    method: 'GET',
  });
  return data?.data;
};

export const createAdmin = async (formData: AdminSchema): Promise<IAdmin> => {
  const { data } = await client({
    url: '/api/admin/admins',
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
    url: `/api/admin/admins/${id}`,
    method: 'PUT',
    data: formData,
  });
  return data?.data;
};

export const deleteAdmin = async (id: string): Promise<void> => {
  const { data } = await client({
    url: `/api/admin/admins/${id}`,
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
    url: `/api/admin/admins/${id}/change-password`,
    method: 'POST',
    data: { currentPassword, newPassword },
  });
  return data?.data;
};
