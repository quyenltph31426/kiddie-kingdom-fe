'use client';
import { useBrands } from '@/api/brand/queries';
import H2 from '@/components/text/H2';
import { Show } from '@/components/utilities';
import React from 'react';
import BrandItem from './components/BrandItem';

const Brand = () => {
  const { data, isFetching } = useBrands({});
  return (
    <section className="mt-10 bg-[#FEF373]">
      <H2 className="mb-8 text-center text-primary-500">List Brand</H2>

      <Show when={!isFetching && data?.items.length === 0}>
        <div>Brand</div>
      </Show>
      <Show when={!isFetching && data && data?.items?.length > 0}>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {data?.items?.map((item) => (
            <BrandItem key={item._id} {...item} />
          ))}
        </div>
      </Show>
    </section>
  );
};

export default Brand;
