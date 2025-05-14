'use client';

import type { IProduct } from '@/api/product/types';
import H4 from '@/components/text/H4';
import { HStack, VStack } from '@/components/utilities';
import React from 'react';

type Props = {} & Partial<IProduct>;

const ProductDetail = ({ primaryCategory }: Props) => {
  return (
    <div className="rounded bg-primary-50 p-4">
      <H4>Product Detail</H4>

      <VStack className="mt-4 text-sm" spacing={20}>
        <HStack className="">
          <div className="w-[200px] font-semibold lg:w-[290px]">Category</div>

          <span>{primaryCategory?.name}</span>
        </HStack>
        <HStack className="">
          <div className="w-[200px] font-semibold lg:w-[290px]">Brand</div>

          <span>{primaryCategory?.name}</span>
        </HStack>
      </VStack>
    </div>
  );
};

export default ProductDetail;
