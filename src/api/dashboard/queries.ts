import { createQuery } from 'react-query-kit';
import { type DashboardStat, getDashboardStats } from './requests';

export const useDashboardStatsQuery = createQuery<DashboardStat[], string>({
  queryKey: ['dashboard/stats'],
  fetcher: (period) => getDashboardStats(period as 'day' | 'week' | 'month' | 'year'),
});
