import { createQuery, createMutation } from 'react-query-kit';
import { getReviews, getReviewById, updateReviewStatus, deleteReview } from './requests';
import type { IReview, IReviewQuery, IReviewResponse } from './types';

export const useReviewsQuery = createQuery<IReviewResponse, Partial<IReviewQuery>>({
  queryKey: ['admin/reviews'],
  fetcher: (params) => getReviews(params),
});

export const useReviewByIdQuery = createQuery<IReview, string>({
  queryKey: ['review'],
  fetcher: (id) => getReviewById(id),
});

export const useUpdateReviewStatusMutation = createMutation<IReview, { id: string; isActive?: boolean; isVerified?: boolean }>({
  mutationFn: ({ id, isActive, isVerified }) => updateReviewStatus({ id, isActive, isVerified }),
});

export const useDeleteReviewMutation = createMutation<void, string>({
  mutationFn: (id) => deleteReview(id),
});
