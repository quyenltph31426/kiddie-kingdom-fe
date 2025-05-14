'use client';
import { useCategoriesQuery } from '@/api/category/queries';
import H2 from '@/components/text/H2';
import { Show } from '@/components/utilities';
import React from 'react';
import CategoryItem from './components/CategoryItem';

const Category = () => {
  const { data, isFetching } = useCategoriesQuery({});
  return (
    <section className="mt-10">
      <H2 className="mb-8 text-center text-primary-500">List categories</H2>

      <Show when={!isFetching && data?.items.length === 0}>
        <div>Category</div>
      </Show>
      <Show when={!isFetching && data && data?.items?.length > 0}>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {data?.items?.map((item) => (
            <CategoryItem key={item._id} {...item} />
          ))}
        </div>
      </Show>
    </section>
  );
};

export default Category;
