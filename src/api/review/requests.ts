import client from '../axios';
import type { IReview, IReviewQuery, IReviewResponse } from './types';

export const getReviews = async (params: Partial<IReviewQuery>): Promise<IReviewResponse> => {
  const { data } = await client({
    url: '/api/admin/reviews',
    method: 'GET',
    params,
  });
  return data?.data;
};

export const getReviewById = async (id: string): Promise<IReview> => {
  const { data } = await client({
    url: `/api/admin/reviews/${id}`,
    method: 'GET',
  });
  return data?.data;
};

export const updateReviewStatus = async ({
  id,
  isActive,
  isVerified,
}: {
  id: string;
  isActive?: boolean;
  isVerified?: boolean;
}): Promise<IReview> => {
  const { data } = await client({
    url: `/api/admin/reviews/${id}`,
    method: 'PATCH',
    data: { isActive, isVerified },
  });
  return data?.data;
};

export const deleteReview = async (id: string): Promise<void> => {
  const { data } = await client({
    url: `/api/admin/reviews/${id}`,
    method: 'DELETE',
  });
  return data?.data;
};
