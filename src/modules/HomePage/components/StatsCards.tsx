import { useDashboardStatsQuery } from '@/api/dashboard/queries';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatCurrency } from '@/libs/common';
import { ArrowDown, ArrowUp, DollarSign, Package, ShoppingCart, Users } from 'lucide-react';
import React, { useState } from 'react';

const iconMap = {
  'Total Revenue': DollarSign,
  'Total Products': Package,
  'Total Orders': ShoppingCart,
  'Total Customers': Users,
};

const colorMap = {
  'Total Revenue': { iconBg: 'bg-primary-100', iconColor: 'text-primary-500' },
  'Total Products': { iconBg: 'bg-blue-100', iconColor: 'text-blue-500' },
  'Total Orders': { iconBg: 'bg-green-100', iconColor: 'text-green-500' },
  'Total Customers': { iconBg: 'bg-red-100', iconColor: 'text-red-500' },
};

const StatsCards = () => {
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const { data: statsData, isLoading } = useDashboardStatsQuery({
    variables: period,
  });

  const handlePeriodChange = (value: string) => {
    setPeriod(value as 'day' | 'week' | 'month' | 'year');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={period} onValueChange={handlePeriodChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Hôm nay</SelectItem>
            <SelectItem value="week">Tuần này</SelectItem>
            <SelectItem value="month">Tháng này</SelectItem>
            <SelectItem value="year">Năm này</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? // Loading skeleton
            Array(4)
              .fill(0)
              .map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between space-x-4">
                      <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                      <div className="text-right">
                        <div className="h-6 w-24 rounded bg-gray-200"></div>
                        <div className="mt-2 h-4 w-16 rounded bg-gray-200"></div>
                      </div>
                    </div>
                    <div className="mt-4 h-4 w-32 rounded bg-gray-200"></div>
                  </CardContent>
                </Card>
              ))
          : statsData?.map((stat, index) => {
              const IconComponent = iconMap[stat.title as keyof typeof iconMap] || Package;
              const colors = colorMap[stat.title as keyof typeof colorMap] || { iconBg: 'bg-gray-100', iconColor: 'text-gray-500' };

              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between space-x-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-full ${colors.iconBg}`}>
                        <IconComponent className={`h-6 w-6 ${colors.iconColor}`} />
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-2xl">
                          {stat.format === 'currency' ? formatCurrency(stat.value) : stat.value.toLocaleString()}
                        </div>
                        <p className="text-muted-foreground text-xs">
                          {stat.change > 0 ? '+' : ''}
                          {stat.change}%{' '}
                          {stat.change > 0 ? (
                            <ArrowUp className="ml-1 inline h-4 w-4 text-green-500" />
                          ) : stat.change < 0 ? (
                            <ArrowDown className="ml-1 inline h-4 w-4 text-red-500" />
                          ) : null}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 font-medium text-sm">{stat.title}</div>
                    {stat.description && <div className="mt-1 text-gray-500 text-xs">{stat.description}</div>}
                  </CardContent>
                </Card>
              );
            })}
      </div>
    </div>
  );
};

export default StatsCards;
