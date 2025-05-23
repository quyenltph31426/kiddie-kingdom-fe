import { useTopCustomersQuery } from '@/api/dashboard/queries';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { HStack, VStack } from '@/components/utilities';
import { formatCurrency } from '@/libs/common';
import { ROUTER } from '@/libs/router';
import { format, subDays, subMonths, subWeeks, subYears } from 'date-fns';
import Link from 'next/link';
import React, { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const TopCustomersChart = () => {
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>('month');
  const [metric, setMetric] = useState<'totalSpent' | 'orderCount'>('totalSpent');

  const getStartDate = () => {
    const now = new Date();
    switch (period) {
      case 'day':
        return format(subDays(now, 1), 'yyyy-MM-dd');
      case 'week':
        return format(subWeeks(now, 1), 'yyyy-MM-dd');
      case 'month':
        return format(subMonths(now, 1), 'yyyy-MM-dd');
      case 'year':
        return format(subYears(now, 1), 'yyyy-MM-dd');
      default:
        return format(subMonths(now, 1), 'yyyy-MM-dd');
    }
  };

  const { data: topCustomers, isLoading } = useTopCustomersQuery({
    variables: {
      limit: 6,
      startDate: getStartDate(),
      endDate: format(new Date(), 'yyyy-MM-dd'),
      period,
    },
  });

  const chartData =
    topCustomers?.map((customer) => ({
      id: customer.id,
      name: customer.username || customer.name || customer.email.split('@')[0],
      displayName: customer.name || customer.username || customer.email.split('@')[0],
      email: customer.email,
      totalSpent: customer.totalSpent / 1000000, // Chuyển đổi sang triệu
      orderCount: customer.orderCount,
      avatar: customer.avatar,
      lastOrderDate: customer.lastOrderDate,
    })) || [];

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Top Khách Hàng </CardTitle>
          <Skeleton className="h-4 w-20" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[350px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2">
        <CardTitle>Top Khách Hàng</CardTitle>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={metric} onValueChange={(value) => setMetric(value as 'totalSpent' | 'orderCount')}>
            <SelectTrigger className="h-8 w-[120px]">
              <SelectValue placeholder="Metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="totalSpent">Total Spent</SelectItem>
              <SelectItem value="orderCount">Order Count</SelectItem>
            </SelectContent>
          </Select>

          <Select value={period} onValueChange={(value) => setPeriod(value as 'day' | 'week' | 'month' | 'year')}>
            <SelectTrigger className="h-8 w-[120px]">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Hôm nay</SelectItem>
              <SelectItem value="week">Tuần này</SelectItem>
              <SelectItem value="month">Tháng này</SelectItem>
              <SelectItem value="year">Năm này</SelectItem>
            </SelectContent>
          </Select>

          <Link href={ROUTER.USER_MANAGEMENT} className="text-blue-500 text-sm hover:underline">
            View All
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {!topCustomers?.length ? (
          <div className="py-8 text-center text-gray-500">
            <p>No customers data available</p>
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 30,
                  left: 80,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" fontSize={10} tickFormatter={(value) => formatCurrency(value * 1000000)} />
                <YAxis type="category" fontSize={10} dataKey="name" tick={{ fontSize: 12 }} width={80} />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === 'totalSpent') {
                      return [`${formatCurrency(Number(value) * 1000000)}`, 'Total Spent'];
                    }
                    return [value, 'Order Count'];
                  }}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const customer = payload[0].payload;
                      return (
                        <div className="rounded-md border bg-white p-3 shadow-md">
                          <div className="mb-2 flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={customer.avatar || '/images/no-image.svg'} alt={customer.displayName} />
                              <AvatarFallback>{customer.displayName.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{customer.displayName}</p>
                              <p className="text-gray-500 text-xs">{customer.email}</p>
                            </div>
                          </div>
                          <div className="text-sm">
                            <p>
                              <span className="font-medium">Total Spent:</span> {formatCurrency(customer.totalSpent * 1000000)}
                            </p>
                            <p>
                              <span className="font-medium">Orders:</span> {customer.orderCount}
                            </p>
                            <p>
                              <span className="font-medium">Last Order:</span> {format(new Date(customer.lastOrderDate), 'dd MMM yyyy')}
                            </p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                {metric === 'totalSpent' ? (
                  <Bar dataKey="totalSpent" fill="#8884d8" name="Total Spent (Million)" radius={[0, 4, 4, 0]} barSize={32} />
                ) : (
                  <Bar dataKey="orderCount" fill="#82ca9d" name="Order Count" radius={[0, 4, 4, 0]} barSize={32} />
                )}
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-6">
              <h3 className="mb-2 font-medium text-sm">Customer Details</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {chartData.map((customer) => (
                  <VStack key={customer.id} className="rounded border p-2">
                    <HStack>
                      <Avatar className="mr-3 h-10 w-10">
                        <AvatarImage src={customer.avatar || '/images/no-image.svg'} alt={customer.displayName} />
                        <AvatarFallback>{customer.displayName.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>

                      <VStack spacing={0} className="text-sm">
                        <p className="line-clamp-1 font-medium text-grey-500">{customer.name}</p>
                        <p className="text-gray-500 text-xs">{customer.email}</p>
                      </VStack>
                    </HStack>
                    <div>
                      <p className="line-clamp-1 font-medium">{customer.displayName}</p>
                      <p className="text-gray-500 text-xs">{formatCurrency(customer.totalSpent * 1000000)}</p>
                      <p className="text-gray-500 text-xs">{customer.orderCount} orders</p>
                    </div>
                  </VStack>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TopCustomersChart;
