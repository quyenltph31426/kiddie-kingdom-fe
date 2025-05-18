import type { IMetaResponse } from '@/types';

export interface IReview {
  _id: string;
  productId: string;
  rating: number;
  comment: string;
  images: string[];
  isActive: boolean;
  isVerified: boolean;
  isPurchased: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  user: {
    _id: string;
    username: string;
    avatar: string | null;
    email: string;
  };
}

export interface IReviewQuery {
  page: number;
  limit: number;
  search?: string;
  productId?: string;
  isActive?: boolean;
  isVerified?: boolean;
  isPurchased?: boolean;
  rating?: number;
}

export interface IReviewResponse {
  items: IReview[];
  meta: IMetaResponse;
}
