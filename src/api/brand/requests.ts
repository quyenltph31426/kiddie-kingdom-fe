import type { BrandSchema } from '@/modules/BrandManagementPage/libs/validators';
import client from '../axios';
import type { IBrandResponse, IBrand, IBrandQuery } from './types';

export const getBrands = async (params: Partial<IBrandQuery>): Promise<IBrandResponse> => {
  const { data } = await client({
    url: '/api/admin/brands',
    method: 'GET',
    params,
  });
  return data?.data;
};

export const getBrandById = async (id: string): Promise<IBrand> => {
  const { data } = await client({
    url: `/api/admin/brands/${id}`,
    method: 'GET',
  });
  return data?.data;
};

export const createBrand = async (formData: BrandSchema): Promise<IBrand> => {
  const { data } = await client({
    url: '/api/admin/brands',
    method: 'POST',
    data: formData,
  });
  return data?.data;
};

export const updateBrand = async ({
  id,
  formData,
}: {
  id: string;
  formData: Partial<BrandSchema>;
}): Promise<IBrand> => {
  const { data } = await client({
    url: `/api/admin/brands/${id}`,
    method: 'PATCH',
    data: formData,
  });
  return data?.data;
};

export const deleteBrand = async (id: string): Promise<void> => {
  const { data } = await client({
    url: `/api/admin/brands/${id}`,
    method: 'DELETE',
  });
  return data?.data;
};
