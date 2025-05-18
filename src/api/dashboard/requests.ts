import client from '../axios';

export interface DashboardStat {
  title: string;
  value: number;
  format: 'currency' | 'number' | 'percent';
  change: number;
  description: string;
}

export interface DashboardStatsResponse {
  data: DashboardStat[];
}

export const getDashboardStats = async (period: 'day' | 'week' | 'month' | 'year' = 'week'): Promise<DashboardStat[]> => {
  const { data } = await client({
    url: `/api/admin/dashboard/stats`,
    method: 'GET',
    params: { period },
  });
  return data?.data || [];
};
