import { useTopProductsQuery } from '@/api/dashboard/queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/libs/common';
import { ROUTER } from '@/libs/router';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const TopProducts = () => {
  const { data: topProducts, isLoading } = useTopProductsQuery({
    variables: { limit: 10 },
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Top Products</CardTitle>
          <Skeleton className="h-4 w-20" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-12 w-12 rounded-md" />
                    <div>
                      <Skeleton className="mb-1 h-5 w-32" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                  <div className="text-right">
                    <Skeleton className="mb-1 h-5 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Sản phẩm bán chạy nhất</CardTitle>
        {/* <Link href={ROUTER.PRODUCT_MANAGEMENT} className="text-blue-500 text-sm hover:underline">
          View All
        </Link> */}
      </CardHeader>
      <CardContent>
        {topProducts?.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            <p>Không có sản phẩm nào</p>
          </div>
        ) : (
          <div className="space-y-4">
            {topProducts?.map((product) => (
              <Link
                key={product.id}
                href={`${ROUTER.PRODUCT_MANAGEMENT}/update/${product.id}`}
                className="flex items-center justify-between rounded-md border-b p-2 pb-4 transition-colors last:border-0 hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                    <Image
                      src={product.image || '/images/no-image.svg'}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="line-clamp-1 font-medium text-sm">{product.name}</div>
                    <div className="flex gap-2 text-gray-500 text-xs">
                      <span>{product.sales} đã bán</span>
                      <span>•</span>
                      <span>{formatCurrency(product.revenue)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="font-medium text-sm">Trong kho: {product.stock}</div>
                  <div className={`text-xs ${product.stock < 20 ? 'text-red-500' : 'text-green-500'}`}>
                    {product.stock < 20 ? 'Low Stock' : 'In Stock'}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TopProducts;
