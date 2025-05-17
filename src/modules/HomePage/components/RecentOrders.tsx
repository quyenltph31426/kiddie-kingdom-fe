import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/libs/common';
import { ROUTER } from '@/libs/router';
import Link from 'next/link';
import React from 'react';
import { orderStatusColors, recentOrders } from '../libs/data';

const getStatusColor = (status: string) => {
  return orderStatusColors[status as keyof typeof orderStatusColors] || 'text-gray-600';
};

const RecentOrders = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Orders</CardTitle>
        <Link href={ROUTER.ORDER_MANAGEMENT} className="text-blue-500 text-sm hover:underline">
          View All
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between border-b pb-4">
              <div>
                <div className="font-medium">{order.customer}</div>
                <div className="text-gray-500 text-sm">Order #{order.id}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">{formatCurrency(order.amount)}</div>
                <div className={`text-sm ${getStatusColor(order.status)}`}>{order.status}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
