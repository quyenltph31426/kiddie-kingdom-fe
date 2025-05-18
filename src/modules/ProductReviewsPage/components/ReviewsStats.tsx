import { IProduct } from '@/api/product/types';
import { IReview } from '@/api/review/types';
import { CheckCircle, MessageSquare, ShieldCheck, Star, ThumbsUp, UserCheck } from 'lucide-react';
import React from 'react';

interface ReviewsStatsProps {
  product: IProduct | undefined;
  reviews: IReview[];
}

const ReviewsStats = ({ product, reviews }: ReviewsStatsProps) => {
  if (!product) return null;

  // Calculate rating distribution
  const ratingCounts = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[review.rating as keyof typeof ratingCounts]++;
    }
  });

  const totalReviews = reviews.length;
  const verifiedReviews = reviews.filter((r) => r.isVerified).length;
  const purchasedReviews = reviews.filter((r) => r.isPurchased).length;
  const activeReviews = reviews.filter((r) => r.isActive).length;
  const reviewsWithImages = reviews.filter((r) => r.images && r.images.length > 0).length;

  const statItems = [
    {
      title: 'Total Reviews',
      value: totalReviews,
      icon: <MessageSquare className="h-4 w-4 text-blue-500" />,
      color: 'bg-blue-50',
    },
    {
      title: 'Average Rating',
      value: product.averageRating ? product.averageRating.toFixed(1) + '/5' : 'N/A',
      icon: <Star className="h-4 w-4 text-amber-500" />,
      color: 'bg-amber-50',
    },
    {
      title: 'Verified Reviews',
      value: verifiedReviews,
      percentage: totalReviews ? Math.round((verifiedReviews / totalReviews) * 100) + '%' : '0%',
      icon: <ShieldCheck className="h-4 w-4 text-green-500" />,
      color: 'bg-green-50',
    },
    {
      title: 'Purchased Reviews',
      value: purchasedReviews,
      percentage: totalReviews ? Math.round((purchasedReviews / totalReviews) * 100) + '%' : '0%',
      icon: <UserCheck className="h-4 w-4 text-purple-500" />,
      color: 'bg-purple-50',
    },
    {
      title: 'Active Reviews',
      value: activeReviews,
      percentage: totalReviews ? Math.round((activeReviews / totalReviews) * 100) + '%' : '0%',
      icon: <CheckCircle className="h-4 w-4 text-teal-500" />,
      color: 'bg-teal-50',
    },
    {
      title: 'Reviews with Images',
      value: reviewsWithImages,
      percentage: totalReviews ? Math.round((reviewsWithImages / totalReviews) * 100) + '%' : '0%',
      icon: <ThumbsUp className="h-4 w-4 text-indigo-500" />,
      color: 'bg-indigo-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {statItems.map((item, idx) => (
          <div key={idx} className={`rounded-lg ${item.color} p-4`}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-600">{item.title}</p>
              {item.icon}
            </div>
            <p className="mt-2 text-2xl font-bold">{item.value}</p>
            {item.percentage && <p className="mt-1 text-xs text-gray-500">{item.percentage} of total</p>}
          </div>
        ))}
      </div>

      {/* Rating Distribution */}
      <div className="rounded-lg border p-4">
        <p className="mb-3 text-sm font-medium text-gray-600">Rating Distribution</p>

        {[5, 4, 3, 2, 1].map((rating) => {
          const count = ratingCounts[rating as keyof typeof ratingCounts];
          const percentage = totalReviews ? Math.round((count / totalReviews) * 100) : 0;

          return (
            <div key={rating} className="mb-2">
              <div className="flex items-center">
                <div className="flex w-16 items-center">
                  <span className="mr-1 text-sm">{rating}</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-1">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div className="h-full rounded-full bg-yellow-400" style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
                <div className="ml-2 w-16 text-right text-xs text-gray-500">
                  {count} ({percentage}%)
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewsStats;
