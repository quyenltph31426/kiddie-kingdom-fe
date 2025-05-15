'use client';

import { useFavoriteProductsQuery } from '@/api/product_favorite/queries';
import Breadcrumb from '@/components/Breadcrumb';
import NoDataAvailable from '@/components/NoDataAvailable';
import H2 from '@/components/text/H2';
import { Button } from '@/components/ui/button';
import { TablePagination } from '@/components/ui/table';
import { Show } from '@/components/utilities';
import Container from '@/components/wrapper/Container';
import { onMutateError } from '@/libs/common';
import { ROUTER } from '@/libs/router';
import ProductItem from '@/modules/ProductsPage/components/ProductItem';
import Link from 'next/link';
import { useState } from 'react';

const FavoritesPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  const { data, isFetching, refetch } = useFavoriteProductsQuery({
    variables: { page, limit },
    onError: onMutateError,
  });

  return (
    <div>
      <Breadcrumb breadcrumbs={[{ name: 'Home', path: ROUTER.HOME }, { name: 'My Favorites' }]} />

      <Container className="py-8">
        <H2 className="mb-6">My Favorites</H2>

        <Show when={isFetching}>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductItem key={index} loading />
            ))}
          </div>
        </Show>

        <Show when={!isFetching && (!data?.items || data.items.length === 0)}>
          <NoDataAvailable
            message="No favorites yet"
            description="You haven't added any products to your favorites yet."
            action={
              <Link href={ROUTER.PRODUCTS}>
                <Button>Browse Products</Button>
              </Link>
            }
          />
        </Show>

        <Show when={!isFetching && data && data.items.length > 0}>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {data?.items.map((favorite) => (
              <ProductItem key={favorite._id} {...favorite.product} />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <TablePagination pagination={data?.meta} loading={isFetching} onPageChange={setPage} onPageSizeChange={setLimit} />
          </div>
        </Show>
      </Container>
    </div>
  );
};

export default FavoritesPage;
