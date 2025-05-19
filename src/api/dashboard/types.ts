export interface RevenueData {
  label: string;
  revenue: number;
  orderCount: number;
  date: string;
}

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

export interface RevenueResponse {
  interval: 'day' | 'week' | 'month' | 'year';
  totalRevenue: number;
  totalOrders: number;
  data: RevenueData[];
}

export interface RevenueParams {
  interval: 'day' | 'week' | 'month' | 'year';
  startDate?: string;
  endDate?: string;
  productIds?: string[];
}

export interface TopProduct {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  stock: number;
  image: string;
  slug: string;
}

export interface TopProductsParams {
  limit?: number;
}
