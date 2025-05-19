import { createQuery } from 'react-query-kit';
import { getDashboardStats, getRevenueData, getTopProducts, getTopCustomers } from './requests';
import type {
  DashboardStat,
  RevenueParams,
  RevenueResponse,
  TopProduct,
  TopProductsParams,
  TopCustomer,
  TopCustomersParams,
} from './types';

export const useDashboardStatsQuery = createQuery<DashboardStat[], string>({
  queryKey: ['dashboard/stats'],
  fetcher: (period) => getDashboardStats(period as 'day' | 'week' | 'month' | 'year'),
});

export const useRevenueTrackingQuery = createQuery<RevenueResponse, Partial<RevenueParams>>({
  queryKey: ['dashboard/revenue'],
  fetcher: (params) => getRevenueData(params),
});

export const useTopProductsQuery = createQuery<TopProduct[], Partial<TopProductsParams>>({
  queryKey: ['dashboard/top-products'],
  fetcher: (params) => getTopProducts(params),
});

export const useTopCustomersQuery = createQuery<TopCustomer[], Partial<TopCustomersParams>>({
  queryKey: ['dashboard/top-customers'],
  fetcher: (params) => getTopCustomers(params),
});
