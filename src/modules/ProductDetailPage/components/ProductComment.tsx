'use client';

import NoDataAvailable from '@/components/NoDataAvailable';
import Tabs from '@/components/tabs/Tabs';
import H2 from '@/components/text/H2';
import { Button } from '@/components/ui/button';
import { Rating } from '@/components/ui/rating';
import { ReviewCard, type ReviewProps } from '@/components/ui/review-card';
import { Show, VStack } from '@/components/utilities';
import { MessageSquare } from 'lucide-react';
import { useState } from 'react';

// Mock data for demonstration
const MOCK_REVIEWS: ReviewProps[] = [
  {
    id: '1',
    userName: 'John Doe',
    rating: 5,
    comment: 'Great product! Exactly as described and arrived quickly.',
    date: '2023-05-15T10:30:00Z',
    helpful: 12,
    verified: true,
  },
  {
    id: '2',
    userName: 'Jane Smith',
    rating: 4,
    comment: 'Good quality but the color is slightly different from what I expected.',
    date: '2023-05-10T14:20:00Z',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
    ],
    helpful: 5,
    verified: true,
  },
  {
    id: '3',
    userName: 'Michael Johnson',
    rating: 3,
    comment: 'Average product. Works as expected but nothing special.',
    date: '2023-05-05T09:15:00Z',
    verified: false,
  },
  {
    id: '4',
    userName: 'Sarah Williams',
    rating: 5,
    comment: 'Absolutely love it! Will definitely buy again.',
    date: '2023-04-28T16:45:00Z',
    helpful: 8,
    verified: true,
  },
  {
    id: '5',
    userName: 'Robert Brown',
    rating: 2,
    comment: 'Disappointed with the quality. Not worth the price.',
    date: '2023-04-20T11:10:00Z',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30'],
    helpful: 3,
    verified: true,
  },
];

const ProductComment = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Filter reviews based on active tab
  const getFilteredReviews = () => {
    switch (activeTab) {
      case '5':
        return MOCK_REVIEWS.filter((review) => review.rating === 5);
      case '4':
        return MOCK_REVIEWS.filter((review) => review.rating === 4);
      case '3':
        return MOCK_REVIEWS.filter((review) => review.rating === 3);
      case '2':
        return MOCK_REVIEWS.filter((review) => review.rating === 2);
      case '1':
        return MOCK_REVIEWS.filter((review) => review.rating === 1);
      case 'all':
      default:
        return MOCK_REVIEWS;
    }
  };

  const filteredReviews = getFilteredReviews();

  // Calculate average rating
  const averageRating = MOCK_REVIEWS.reduce((acc, review) => acc + review.rating, 0) / MOCK_REVIEWS.length;

  // Calculate rating distribution
  const ratingCounts = MOCK_REVIEWS.reduce(
    (acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>
  );

  const tabOptions = [
    { label: 'All Reviews', value: 'all' },
    { label: '5 Star', value: '5' },
    { label: '4 Star', value: '4' },
    { label: '3 Star', value: '3' },
    { label: '2 Star', value: '2' },
    { label: '1 Star', value: '1' },
  ];

  return (
    <div className="mt-16">
      <H2 className="font-orbitron">Customer Reviews</H2>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Rating summary */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="text-center">
            <div className="mb-2 font-bold text-3xl">{averageRating.toFixed(1)}</div>
            <Rating value={averageRating} size="lg" readOnly showValue />
            <p className="mt-2 text-gray-500 text-sm">{MOCK_REVIEWS.length} reviews</p>
          </div>

          <div className="mt-6 space-y-3">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2">
                <span className="min-w-8 text-sm">{star} star</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full bg-yellow-500"
                    style={{
                      width: `${((ratingCounts[star] || 0) / MOCK_REVIEWS.length) * 100}%`,
                    }}
                  />
                </div>
                <span className="min-w-8 text-right text-gray-500 text-sm">{ratingCounts[star] || 0}</span>
              </div>
            ))}
          </div>

          <Button className="mt-6 w-full">Write a Review</Button>
        </div>

        {/* Reviews list */}
        <div className="lg:col-span-3">
          <Tabs data={tabOptions} value={activeTab} onChange={(value) => setActiveTab(value.toString())} layoutId="product-reviews-tabs" />

          <Show when={isLoading}>
            <VStack spacing={16} className="mt-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-32 w-full animate-pulse rounded-lg bg-gray-200"></div>
              ))}
            </VStack>
          </Show>

          <Show when={!isLoading && filteredReviews.length === 0}>
            <NoDataAvailable
              title="No reviews yet"
              description={`There are no ${activeTab !== 'all' ? activeTab + ' star ' : ''}reviews for this product.`}
              icon={<MessageSquare className="h-16 w-16 text-gray-400" />}
            />
          </Show>

          <Show when={!isLoading && filteredReviews.length > 0}>
            <VStack spacing={16} className="mt-6">
              {filteredReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </VStack>

            {filteredReviews.length > 5 && (
              <div className="mt-8 flex justify-center">
                <Button variant="outline">Load More Reviews</Button>
              </div>
            )}
          </Show>
        </div>
      </div>
    </div>
  );
};

export default ProductComment;
