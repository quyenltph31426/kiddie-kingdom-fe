'use client';

import type { IProduct } from '@/api/product/types';
import H4 from '@/components/text/H4';
import { HStack, VStack } from '@/components/utilities';
import React from 'react';

type Props = {} & Partial<IProduct>;

const ProductDetail = ({ primaryCategory, specifications }: Props) => {
  return (
    <div className="rounded bg-primary-50 p-4">
      <H4>Product Detail</H4>

      <VStack className="mt-4 text-sm" spacing={20}>
        <HStack className="">
          <div className="w-[160px] font-semibold lg:w-[200px]">Category</div>
          <span>|</span> <span className="ml-10">{primaryCategory?.name}</span>
        </HStack>
        <HStack className="">
          <div className="w-[160px] font-semibold lg:w-[200px]">Brand</div>
          <span>|</span> <span className="ml-10">{primaryCategory?.name}</span>
        </HStack>

        {specifications && (
          <>
            {Object.entries(specifications).map(([key, value]) => (
              <HStack key={key}>
                <div className="w-[160px] font-semibold lg:w-[200px]">{key}</div>
                <span>|</span>
                <span className="ml-10">{value}</span>
              </HStack>
            ))}
          </>
        )}
      </VStack>
    </div>
  );
};

export default ProductDetail;
