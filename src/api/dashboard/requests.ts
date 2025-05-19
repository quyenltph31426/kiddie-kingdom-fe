import client from '../axios';
import type {
  DashboardStat,
  RevenueParams,
  RevenueResponse,
  TopCustomer,
  TopCustomersParams,
  TopProduct,
  TopProductsParams,
} from './types';

export const getDashboardStats = async (period: 'day' | 'week' | 'month' | 'year' = 'week'): Promise<DashboardStat[]> => {
  const { data } = await client({
    url: `/api/admin/dashboard/stats`,
    method: 'GET',
    params: { period },
  });
  return data?.data || [];
};

export const getRevenueData = async (params: Partial<RevenueParams>): Promise<RevenueResponse> => {
  const { data } = await client({
    url: '/api/admin/dashboard/revenue-stats',
    method: 'GET',
    params,
  });
  return data?.data;
};

export const getTopProducts = async (params: Partial<TopProductsParams> = {}): Promise<TopProduct[]> => {
  const { data } = await client({
    url: '/api/admin/dashboard/top-products',
    method: 'GET',
    params,
  });
  return data?.data || [];
};

export const getTopCustomers = async (params: Partial<TopCustomersParams> = {}): Promise<TopCustomer[]> => {
  const { data } = await client({
    url: '/api/admin/dashboard/top-customers',
    method: 'GET',
    params,
  });
  return data?.data || [];
};
