import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/libs/common';
import React from 'react';
import { performanceMetrics } from '../libs/data';

const PerformanceMetrics = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          {performanceMetrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium text-sm">{metric.name}</div>
                <div className="font-medium text-sm">
                  {metric.format === 'currency' ? formatCurrency(metric.value) : `${metric.value}%`}
                </div>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div className={`h-2 rounded-full ${metric.color}`} style={{ width: metric.width }}></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
