'use client';
import { useProductByIdQuery } from '@/api/product/queries';
import { useReviewsQuery } from '@/api/review/queries';
import { Icons } from '@/assets/icons';
import H1 from '@/components/text/H1';
import { Button } from '@/components/ui/button';
import { HStack } from '@/components/utilities';
import Container from '@/components/wrapper/Container';
import { ROUTER } from '@/libs/router';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import ProductOverview from './components/ProductOverview';
import ReviewsSection from './components/ReviewsSection';

const ProductReviewsPage = () => {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const [reviewsParams, setReviewsParams] = useState({
    page: 1,
    limit: 10,
    productId,
  });

  const { data: product, isLoading: isLoadingProduct } = useProductByIdQuery({
    variables: productId,
    enabled: !!productId,
  });

  const { data: reviews, isLoading: isLoadingReviews } = useReviewsQuery({
    variables: reviewsParams,
    enabled: !!productId,
  });

  if (isLoadingProduct) {
    return (
      <Container>
        <div className="flex h-[60vh] items-center justify-center">
          <Icons.spinner className="h-8 w-8 animate-spin" />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <HStack className="mb-6" spacing={4}>
        <Button variant="outline" size="icon" onClick={() => router.push(`${ROUTER.PRODUCT_MANAGEMENT}`)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <H1 className="font-orbitron">Quản lý đánh giá sản phẩm</H1>
          <p className="text-gray-500">{product?.name}</p>
        </div>
      </HStack>

      {/* Product Overview Section */}
      <ProductOverview product={product} />

      {/* Reviews Section */}
      <div className="mt-6">
        <ReviewsSection
          product={product}
          reviews={reviews?.items || []}
          isLoading={isLoadingReviews}
          pagination={reviews?.meta}
          onPageChange={(page) => setReviewsParams({ ...reviewsParams, page })}
          onPageSizeChange={(limit) => setReviewsParams({ ...reviewsParams, page: 1, limit })}
        />
      </div>
    </Container>
  );
};

export default ProductReviewsPage;
