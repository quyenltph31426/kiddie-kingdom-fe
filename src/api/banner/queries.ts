import { createQuery, createMutation } from 'react-query-kit';
import { getBanners, getBannerById, createBanner, updateBanner, deleteBanner } from './requests';
import type { IBannerResponse, IBanner, IBannerQuery } from './types';
import type { BannerSchema } from '@/modules/BannerManagementPage/libs/validators';

export const useBanners = createQuery<IBannerResponse, Partial<IBannerQuery>>({
  queryKey: ['admin/banners'],
  fetcher: (params) => getBanners(params),
});

export const useBannerByIdQuery = createQuery<IBanner, string>({
  queryKey: ['banner'],
  fetcher: (id) => getBannerById(id),
});

export const useCreateBannerMutation = createMutation<IBanner, BannerSchema>({
  mutationFn: (data) => createBanner(data),
});

export const useUpdateBannerMutation = createMutation<IBanner, { id: string; formData: Partial<BannerSchema> }>({
  mutationFn: ({ id, formData }) => updateBanner({ id, formData }),
});

export const useDeleteBannerMutation = createMutation<void, string>({
  mutationFn: (id) => deleteBanner(id),
});
