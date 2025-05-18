import type { IMetaResponse } from '@/types';

export interface IVoucher {
  _id: string;
  code: string;
  name: string;
  description?: string;
  type: 'PERCENTAGE' | 'FIXED';
  value: number;
  minOrderValue: number;
  maxDiscountValue: number;
  usageLimit: number;
  usageCount?: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IVoucherQuery {
  page: number;
  limit: number;
  search?: string;
  isActive?: boolean;
}

export interface IVoucherResponse {
  items: IVoucher[];
  meta: IMetaResponse;
}
