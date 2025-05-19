import client from '../axios';
import type { DashboardStat, RevenueParams, RevenueResponse } from './types';

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
