import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/libs/common';
import { ArrowDown, ArrowUp } from 'lucide-react';
import React from 'react';
import { statsData } from '../libs/data';

const StatsCards = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.iconBg}`}>
                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
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
                  ) : (
                    <ArrowDown className="ml-1 inline h-4 w-4 text-red-500" />
                  )}
                </p>
              </div>
            </div>
            <div className="mt-4 font-medium text-sm">{stat.title}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
