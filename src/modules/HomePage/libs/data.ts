import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react';

export const statsData = [
  {
    title: 'Total Revenue',
    value: 54200,
    format: 'currency',
    change: 20.1,
    icon: DollarSign,
    iconBg: 'bg-primary-100',
    iconColor: 'text-primary-500',
  },
  {
    title: 'Total Products',
    value: 1254,
    format: 'number',
    change: 12.4,
    icon: Package,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-500',
  },
  {
    title: 'Total Orders',
    value: 573,
    format: 'number',
    change: 8.2,
    icon: ShoppingCart,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-500',
  },
  {
    title: 'Total Customers',
    value: 2834,
    format: 'number',
    change: -2.5,
    icon: Users,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-500',
  },
];

export const salesData = [
  { name: 'Jan', total: 1200 },
  { name: 'Feb', total: 1900 },
  { name: 'Mar', total: 2400 },
  { name: 'Apr', total: 1800 },
  { name: 'May', total: 2800 },
  { name: 'Jun', total: 3200 },
  { name: 'Jul', total: 2600 },
  { name: 'Aug', total: 3800 },
  { name: 'Sep', total: 4200 },
  { name: 'Oct', total: 3600 },
  { name: 'Nov', total: 4800 },
  { name: 'Dec', total: 5400 },
];

export const productCategoryData = [
  { name: 'Electronics', value: 35 },
  { name: 'Clothing', value: 25 },
  { name: 'Home & Kitchen', value: 20 },
  { name: 'Books', value: 10 },
  { name: 'Others', value: 10 },
];

export const CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const weeklyOrdersData = [
  { day: 'Mon', orders: 45 },
  { day: 'Tue', orders: 52 },
  { day: 'Wed', orders: 38 },
  { day: 'Thu', orders: 65 },
  { day: 'Fri', orders: 78 },
  { day: 'Sat', orders: 90 },
  { day: 'Sun', orders: 48 },
];

export const recentOrders = [
  { id: '1', customer: 'John Doe', amount: 120, status: 'COMPLETED', date: '2023-10-15' },
  { id: '2', customer: 'Jane Smith', amount: 350, status: 'TO_PAY', date: '2023-10-14' },
  { id: '3', customer: 'Robert Johnson', amount: 75, status: 'COMPLETED', date: '2023-10-13' },
  { id: '4', customer: 'Emily Davis', amount: 220, status: 'CANCELED', date: '2023-10-12' },
  { id: '5', customer: 'Michael Brown', amount: 180, status: 'COMPLETED', date: '2023-10-11' },
];

export const topProducts = [
  { id: '1', name: 'Wireless Headphones', sales: 245, stock: 45 },
  { id: '2', name: 'Smart Watch', sales: 186, stock: 32 },
  { id: '3', name: 'Laptop Backpack', sales: 152, stock: 28 },
  { id: '4', name: 'Bluetooth Speaker', sales: 138, stock: 12 },
  { id: '5', name: 'Fitness Tracker', sales: 127, stock: 34 },
];

export const performanceMetrics = [
  { name: 'Conversion Rate', value: 3.6, format: 'percent', color: 'bg-blue-500', width: '36%' },
  { name: 'Average Order Value', value: 128, format: 'currency', color: 'bg-green-500', width: '64%' },
  { name: 'Customer Retention', value: 72, format: 'percent', color: 'bg-purple-500', width: '72%' },
];

export const orderStatusColors = {
  COMPLETED: 'text-green-600',
  TO_PAY: 'text-yellow-600',
  CANCELED: 'text-red-600',
  REFUND: 'text-gray-600',
  EXPIRED: 'text-orange-600',
  PROCESSING: 'text-blue-600',
  SHIPPED: 'text-indigo-600',
  DELIVERED: 'text-emerald-600',
};

// Monthly revenue data for the past year
export const yearlyRevenueData = [
  { month: 'Jan 2023', revenue: 32500 },
  { month: 'Feb 2023', revenue: 36700 },
  { month: 'Mar 2023', revenue: 42300 },
  { month: 'Apr 2023', revenue: 38900 },
  { month: 'May 2023', revenue: 44200 },
  { month: 'Jun 2023', revenue: 48700 },
  { month: 'Jul 2023', revenue: 52100 },
  { month: 'Aug 2023', revenue: 49800 },
  { month: 'Sep 2023', revenue: 53400 },
  { month: 'Oct 2023', revenue: 58900 },
  { month: 'Nov 2023', revenue: 62300 },
  { month: 'Dec 2023', revenue: 67800 },
];

// Traffic sources data
export const trafficSourcesData = [
  { source: 'Direct', sessions: 5840, percentage: 35 },
  { source: 'Organic Search', sessions: 4200, percentage: 25 },
  { source: 'Social Media', sessions: 3360, percentage: 20 },
  { source: 'Referral', sessions: 1680, percentage: 10 },
  { source: 'Email', sessions: 1680, percentage: 10 },
];

// Customer demographics data
export const customerDemographicsData = [
  { age: '18-24', percentage: 15 },
  { age: '25-34', percentage: 32 },
  { age: '35-44', percentage: 27 },
  { age: '45-54', percentage: 18 },
  { age: '55+', percentage: 8 },
];

// Product inventory status
export const inventoryStatusData = [
  { status: 'In Stock', count: 842, percentage: 67 },
  { status: 'Low Stock', count: 253, percentage: 20 },
  { status: 'Out of Stock', count: 159, percentage: 13 },
];

// Recent activities
export const recentActivities = [
  { id: 1, type: 'order', message: 'New order #12345 received', time: '5 minutes ago' },
  { id: 2, type: 'product', message: 'Product "Smart Watch" is low on stock', time: '25 minutes ago' },
  { id: 3, type: 'customer', message: 'New customer registration: Jane Smith', time: '1 hour ago' },
  { id: 4, type: 'review', message: 'New 5-star review for "Wireless Headphones"', time: '2 hours ago' },
  { id: 5, type: 'order', message: 'Order #12340 has been shipped', time: '3 hours ago' },
  { id: 6, type: 'system', message: 'System update completed successfully', time: '5 hours ago' },
];
