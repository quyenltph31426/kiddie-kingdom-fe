'use client';

import { useRevenueTrackingQuery } from '@/api/dashboard/queries';
import type { RevenueParams } from '@/api/dashboard/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DateRangePicker } from '@/components/ui/date-range-picker/index';
import SelectCustom from '@/components/ui/select-custom';
import { HStack } from '@/components/utilities';
import { formatCurrency } from '@/libs/common';
import { formatNumber } from '@/libs/utils';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { REVENUE_INTERVAL } from '../libs/consts';

interface RevenueData {
  label: string;
  revenue: number;
  orderCount: number;
  date: string;
}

const RevenueChart = () => {
  const [paramsQuery, setParamsQuery] = useState<Partial<RevenueParams>>({
    interval: 'week',
    startDate: format(new Date(new Date().setDate(new Date().getDate() - 30)), 'yyyy-MM-dd'),
    endDate: format(new Date(new Date().setHours(23, 59, 0, 0)), 'yyyy-MM-dd HH:mm:ss'),
  });

  const { data, isLoading } = useRevenueTrackingQuery({
    variables: paramsQuery,
  });

  const handleDateRangeChange = (values: any) => {
    if (values.range) {
      setParamsQuery((prev) => ({
        ...prev,
        startDate: format(values.range.from, 'yyyy-MM-dd'),
        endDate: format(new Date(values.range.to.setHours(23, 59, 0, 0)), 'yyyy-MM-dd HH:mm:ss'),
      }));
    } else {
      setParamsQuery((prev) => ({
        ...prev,
        startDate: undefined,
        endDate: undefined,
      }));
    }
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <HStack pos="apart">
          <CardTitle className="lg:text-xl">Doanh thu</CardTitle>
          <div className="flex items-center space-x-2">
            <DateRangePicker
              onUpdate={handleDateRangeChange}
              align="end"
              locale="en-US"
              btnProps={{
                variant: 'outline',
                className: 'h-8',
              }}
            />
          </div>
        </HStack>

        <HStack pos="right" className="mt-2">
          <SelectCustom height="36px" />
          <SelectCustom
            data={REVENUE_INTERVAL}
            height="36px"
            value={paramsQuery.interval || 'week'}
            onChangeValue={(value) => {
              setParamsQuery((prev) => ({
                ...prev,
                interval: value as 'day' | 'week' | 'month' | 'year',
              }));
            }}
          />
        </HStack>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-between">
          <div>
            <p className="text-muted-foreground text-sm">Doanh thu</p>
            <p className="font-bold text-xl">{formatCurrency(data?.totalRevenue)}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Tổng đơn hàng</p>
            <p className="font-bold text-xl">{formatNumber(data?.totalOrders)}</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart
            data={data?.data}
            margin={{
              top: 10,
              right: 20,
              left: 50,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis fontSize={10} dataKey="label" />
            <YAxis fontSize={10} tickFormatter={(value) => formatCurrency(value)} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip formatter={(value) => formatCurrency(value as number)} />
            <Area fontSize={10} type="monotone" dataKey="revenue" stroke="#8884d8" fillOpacity={1} fill="url(#colorRevenue)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
