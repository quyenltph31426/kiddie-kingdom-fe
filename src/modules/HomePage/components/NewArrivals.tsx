'use client';

import { useProductsNewArrivalsQuery } from '@/api/product/queries';
import H2 from '@/components/text/H2';
import { Button } from '@/components/ui/button';
import { Show } from '@/components/utilities';
import { ROUTER } from '@/libs/router';
import ProductItem from '@/modules/ProductsPage/components/ProductItem';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const NewArrivals = () => {
  const { data, isFetching } = useProductsNewArrivalsQuery({
    variables: { limit: 6 },
  });

  return (
    <section className="mt-10">
      <div className="mb-8 flex items-center justify-between">
        <H2 className="text-primary-500">New Arrivals</H2>
        <Link href={ROUTER.PRODUCTS}>
          <Button variant="ghost" className="group">
            View All
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      <Show when={isFetching}>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductItem key={index} loading />
          ))}
        </div>
      </Show>

      <Show when={!isFetching && (!data?.items || data.items.length === 0)}>
        <div className="flex justify-center py-8">
          <p className="text-gray-500">No new arrival products available</p>
        </div>
      </Show>

      <Show when={!isFetching && data && data?.items?.length > 0}>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {data?.items?.map((item) => (
            <ProductItem key={item._id} {...item} />
          ))}
        </div>
      </Show>
    </section>
  );
};

export default NewArrivals;
