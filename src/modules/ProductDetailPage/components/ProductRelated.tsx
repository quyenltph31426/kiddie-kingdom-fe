'use client';

import { useProductsRelated } from '@/api/product/queries';
import H2 from '@/components/text/H2';
import { Show } from '@/components/utilities';
import { onMutateError } from '@/libs/common';
import ProductItem from '@/modules/ProductsPage/components/ProductItem';
import React from 'react';

type Props = {
  productId: string;
};
const ProductRelated = ({ productId }: Props) => {
  const { isFetching } = useProductsRelated({
    variables: { productId, params: { limit: 1000 } },
    enabled: Boolean(productId),
    onError: onMutateError,
  });

  const data: any = {};

  return (
    <section className="mt-10">
      <H2 className="mb-8 text-center text-primary-500">Product Related</H2>

      <Show when={!isFetching && data?.items?.length === 0}>
        <div>Category</div>
      </Show>
      <Show when={!isFetching && data && data?.items?.length > 0}>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {data?.items?.map((item: any) => (
            <ProductItem key={item._id} {...item} />
          ))}
        </div>
      </Show>
    </section>
  );
};

export default ProductRelated;
