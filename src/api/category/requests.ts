import type { CategorySchema } from '@/modules/CategoryManagementPage/libs/validators';
import client from '../axios';
import type { ICategoryResponse, ICategory, ICategoryQuery } from './types';

export const getCategories = async (params: Partial<ICategoryQuery>): Promise<ICategoryResponse> => {
  const { data } = await client({
    url: '/api/admin/categories',
    method: 'GET',
    params,
  });
  return data?.data;
};

export const getCategoryById = async (id: string): Promise<ICategory> => {
  const { data } = await client({
    url: `/api/admin/categories/${id}`,
    method: 'GET',
  });
  return data?.data;
};

export const createCategory = async (formData: CategorySchema): Promise<ICategory> => {
  const { data } = await client({
    url: '/api/admin/categories',
    method: 'POST',
    data: formData,
  });
  return data?.data;
};

export const updateCategory = async ({
  id,
  formData,
}: {
  id: string;
  formData: Partial<CategorySchema>;
}): Promise<ICategory> => {
  const { data } = await client({
    url: `/api/admin/categories/${id}`,
    method: 'PUT',
    data: formData,
  });
  return data?.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  const { data } = await client({
    url: `/api/admin/categories/${id}`,
    method: 'DELETE',
  });
  return data?.data;
};
