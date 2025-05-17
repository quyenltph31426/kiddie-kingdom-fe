import type { IProduct } from '@/api/product/types';
import type { IReview } from '@/api/review/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HStack } from '@/components/utilities';
import type { IMetaResponse } from '@/types';
import { Star } from 'lucide-react';
import React from 'react';
import ProductReviewsTable from './ProductReviewsTable';
import ReviewsStats from './ReviewsStats';

interface ReviewsSectionProps {
  product: IProduct | undefined;
  reviews: IReview[];
  isLoading: boolean;
  pagination?: IMetaResponse;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const ReviewsSection = ({ product, reviews, isLoading, pagination, onPageChange, onPageSizeChange }: ReviewsSectionProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Reviews Stats Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Reviews Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ReviewsStats product={product} reviews={reviews} />
        </CardContent>
      </Card>

      {/* Reviews List Card */}
      <Card className="lg:col-span-2">
        <CardHeader className="pb-2">
          <HStack pos="apart">
            <CardTitle className="text-xl">Reviews List</CardTitle>
            <HStack spacing={4}>
              <Badge variant="outline" className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{product?.averageRating?.toFixed(1) || '0.0'}</span>
              </Badge>
              <Badge variant="outline">{product?.reviewCount || 0} reviews</Badge>
            </HStack>
          </HStack>
        </CardHeader>
        <CardContent>
          <ProductReviewsTable
            reviews={reviews}
            isLoading={isLoading}
            pagination={pagination}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewsSection;
