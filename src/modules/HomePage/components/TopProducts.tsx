import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ROUTER } from '@/libs/router';
import Link from 'next/link';
import React from 'react';
import { topProducts } from '../libs/data';

const TopProducts = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Top Products</CardTitle>
        <Link href={ROUTER.PRODUCT_MANAGEMENT} className="text-blue-500 text-sm hover:underline">
          View All
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topProducts.map((product) => (
            <div key={product.id} className="flex items-center justify-between border-b pb-4">
              <div>
                <div className="font-medium">{product.name}</div>
                <div className="text-gray-500 text-sm">{product.sales} sales</div>
              </div>
              <div className="text-right">
                <div className="font-medium">Stock: {product.stock}</div>
                <div className={`text-sm ${product.stock < 20 ? 'text-red-500' : 'text-green-500'}`}>
                  {product.stock < 20 ? 'Low Stock' : 'In Stock'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopProducts;
