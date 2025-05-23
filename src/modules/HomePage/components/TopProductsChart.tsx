import { useTopProductsQuery } from '@/api/dashboard/queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/libs/common';
import { formatNumber } from '@/libs/utils';
import React, { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const TopProductsChart = () => {
  const [metric, setMetric] = useState<'sales' | 'revenue'>('sales');

  const { data: topProducts, isLoading } = useTopProductsQuery({
    variables: {
      limit: 10,
    },
  });

  const chartData =
    topProducts?.map((product) => ({
      name: product.name.length > 20 ? product.name.substring(0, 20) + '...' : product.name,
      sales: product.sales,
      revenue: product.revenue,
      fullName: product.name,
      id: product.id,
    })) || [];

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Top Sản phẩm Bán Chạy Nhất</CardTitle>
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
        <CardTitle>Top Sản phẩm Bán Chạy Nhất</CardTitle>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={metric} onValueChange={(value) => setMetric(value as 'sales' | 'revenue')}>
            <SelectTrigger className="h-8 w-[120px]">
              <SelectValue placeholder="Metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sales">Đã bán</SelectItem>
              <SelectItem value="revenue">Doanh thu</SelectItem>
            </SelectContent>
          </Select>

          {/* <Link href={ROUTER.PRODUCT_MANAGEMENT} className="text-blue-500 text-sm hover:underline">
            View All
          </Link> */}
        </div>
      </CardHeader>
      <CardContent>
        {!topProducts?.length ? (
          <div className="py-8 text-center text-gray-500">
            <p>Không có sản phẩm nào</p>
          </div>
        ) : (
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
              <XAxis type="number" fontSize={10} tickFormatter={(value) => formatNumber(value)} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} />
              <Tooltip
                formatter={(value, name) => {
                  if (name === 'revenue') {
                    return [`${formatCurrency(Number(value))}`, 'Revenue'];
                  }
                  return [formatNumber(value as any), 'Sales'];
                }}
                labelFormatter={(label, payload) => {
                  if (payload && payload.length > 0) {
                    return payload[0].payload.fullName;
                  }
                  return label;
                }}
              />
              <Legend />
              {metric === 'sales' ? (
                <Bar dataKey="sales" fill="#82ca9d" name="Sales" radius={[0, 4, 4, 0]} barSize={32} />
              ) : (
                <Bar dataKey="revenue" fill="#8884d8" name="Revenue (Million)" radius={[0, 4, 4, 0]} barSize={32} />
              )}
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default TopProductsChart;
