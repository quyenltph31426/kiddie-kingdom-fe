import type { BannerSchema } from '@/modules/BannerManagementPage/libs/validators';
import client from '../axios';
import type { IBanner, IBannerQuery, IBannerResponse } from './types';

export const getBanners = async (params: Partial<IBannerQuery>): Promise<IBannerResponse> => {
  const { data } = await client({
    url: '/api/admin/banners',
    method: 'GET',
    params,
  });
  return data?.data;
};

export const getBannerById = async (id: string): Promise<IBanner> => {
  const { data } = await client({
    url: `/api/admin/banners/${id}`,
    method: 'GET',
  });
  return data?.data;
};

export const createBanner = async (formData: BannerSchema): Promise<IBanner> => {
  const { data } = await client({
    url: '/api/admin/banners',
    method: 'POST',
    data: formData,
  });
  return data?.data;
};

export const updateBanner = async ({
  id,
  formData,
}: {
  id: string;
  formData: Partial<BannerSchema>;
}): Promise<IBanner> => {
  const { data } = await client({
    url: `/api/admin/banners/${id}`,
    method: 'PUT',
    data: formData,
  });
  return data?.data;
};

export const deleteBanner = async (id: string): Promise<void> => {
  const { data } = await client({
    url: `/api/admin/banners/${id}`,
    method: 'DELETE',
  });
  return data?.data;
};
