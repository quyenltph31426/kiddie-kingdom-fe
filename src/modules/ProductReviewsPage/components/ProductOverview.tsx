import type { IProduct } from '@/api/product/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/libs/common';
import { Box, Eye, Package, ShoppingCart, Star, Tag, Truck } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface ProductOverviewProps {
  product: IProduct | undefined;
}

const ProductOverview = ({ product }: ProductOverviewProps) => {
  if (!product) return null;

  const productStats = [
    {
      label: 'Lượt xem',
      value: product.viewCount || 0,
      icon: <Eye className="h-4 w-4 text-blue-500" />,
      color: 'bg-blue-50',
    },
    {
      label: 'Đã bán',
      value: product.totalSoldCount || 0,
      icon: <ShoppingCart className="h-4 w-4 text-green-500" />,
      color: 'bg-green-50',
    },
    {
      label: 'Số lượng',
      value: product.variants?.reduce((acc, curr) => acc + curr.quantity, 0) || 0,
      icon: <Package className="h-4 w-4 text-amber-500" />,
      color: 'bg-amber-50',
    },
    {
      label: 'Đánh giá',
      value: product.averageRating ? `${product.averageRating.toFixed(1)}/5` : 'N/A',
      icon: <Star className="h-4 w-4 text-yellow-500" />,
      color: 'bg-yellow-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Product Image and Basic Info */}
      <Card className="overflow-hidden">
        <div className="relative aspect-square w-full">
          <Image src={product.images?.[0] || '/images/no-image.svg'} alt={product.name} fill className="object-cover" />
        </div>
        <CardContent className="p-4">
          <h2 className="mb-2 font-bold text-xl">{product.name}</h2>
          <div className="flex items-center justify-between">
            <div className="font-bold text-lg text-primary-600">{formatCurrency(product.currentPrice || product.originalPrice)}</div>
            {product.currentPrice && product.originalPrice && (
              <div className="text-gray-500 text-sm line-through">{formatCurrency(product.originalPrice)}</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Product Stats */}
      <Card className="lg:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Tổng quan sản phẩm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {productStats.map((stat, index) => (
              <div key={index} className={`rounded-lg ${stat.color} p-4`}>
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-600 text-sm">{stat.label}</p>
                  {stat.icon}
                </div>
                <p className="mt-2 font-bold text-2xl">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Additional Product Info */}
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-center gap-2">
                <Tag className="h-4 w-4 text-gray-500" />
                <h3 className="font-medium">Danh mục</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {product?.categories?.map((category: any, index) => (
                  <span key={index} className="rounded-full bg-gray-100 px-3 py-1 text-xs">
                    {typeof category === 'string' ? category : category.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-center gap-2">
                <Box className="h-4 w-4 text-gray-500" />
                <h3 className="font-medium">Trạng thái</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${product.isActive ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                  <span className="text-sm">{product.isActive ? 'Active' : 'Inactive'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${product.isFeatured ? 'bg-purple-500' : 'bg-gray-300'}`}></span>
                  <span className="text-sm">{product.isFeatured ? 'Featured' : 'Not Featured'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${product.isOnSale ? 'bg-red-500' : 'bg-gray-300'}`}></span>
                  <span className="text-sm">{product.isOnSale ? 'On Sale' : 'Regular Price'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${product.isNewArrival ? 'bg-blue-500' : 'bg-gray-300'}`}></span>
                  <span className="text-sm">{product.isNewArrival ? 'New Arrival' : 'Standard'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="mt-4 rounded-lg border p-4">
            <div className="mb-2 flex items-center gap-2">
              <Truck className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium">Thông tin vận chuyển</h3>
            </div>
            {/* <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
              <div>
                <p className="text-gray-500 text-xs">SKU</p>
                <p className="font-medium text-sm">{product.sku || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Brand</p>
                <p className="font-medium text-sm">
                  {typeof product.brandId === 'object' ? product.brandId.name : product.brandName || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Variants</p>
                <p className="font-medium text-sm">{product.variants?.length || 0} options</p>
              </div>
            </div> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductOverview;
