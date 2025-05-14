import type { IProduct } from '@/api/product/types';
import { Icons } from '@/assets/icons';
import H4 from '@/components/text/H4';
import { SkeletonWrapper } from '@/components/ui/skeleton-wrapper';
import { HStack, VStack } from '@/components/utilities';
import { ROUTER } from '@/libs/router';
import { formatNumber } from '@/libs/utils';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  loading?: boolean;
} & Partial<IProduct>;

const ProductItem = ({ loading, name, brand, slug, images, originalPrice, currentPrice }: Props) => {
  const _originalPrice = originalPrice ? originalPrice : Number(currentPrice) + 10000;
  return (
    <Link href={`${ROUTER.PRODUCTS}/${slug}`}>
      <VStack className="group relative h-full rounded-lg border p-4">
        <SkeletonWrapper loading={loading}>
          <div className="flex-1 overflow-hidden">
            <Image
              alt=""
              src={images?.[0] || '/images/no-image.svg'}
              width={300}
              height={300}
              className="w-full object-cover transition-all duration-300 group-hover:scale-105"
            />
            <HStack className="mt-1">
              <div className="line-clamp-1 max-w-[160px] font-semibold text-[#8f8f8f] text-sm uppercase">{brand?.name}</div>
            </HStack>
          </div>
        </SkeletonWrapper>

        <SkeletonWrapper className="h-4 w-full" loading={loading}>
          <H4 className="font-poppins text-[#041675] lg:text-base">{name}</H4>
        </SkeletonWrapper>

        <HStack pos="apart">
          <SkeletonWrapper className="h-4 w-[30%]" loading={loading}>
            <span className="text-base text-primary-700">{formatNumber(currentPrice)} vnd</span>
          </SkeletonWrapper>

          <SkeletonWrapper className="h-4 w-[30%]" loading={loading}>
            <span className="text-sm line-through">{formatNumber(_originalPrice)} vnd</span>
          </SkeletonWrapper>
        </HStack>

        <HStack>
          <span className="p-1 hover:text-primary-500 ">
            <Heart className="hover:fill-primary-500" />
          </span>
        </HStack>

        <div className="text-xs">
          <div className="absolute top-2 right-2 flex items-center bg-[#ffe97a] text-[#ec3814]">
            <Icons.lightning className="mr-1" /> -{formatNumber(((_originalPrice - Number(currentPrice || 0)) / _originalPrice) * 100)} %
          </div>
          <div className="absolute top-2 left-2 rounded bg-primary-500 px-2 py-1 text-white">New</div>
        </div>
      </VStack>
    </Link>
  );
};

export default ProductItem;
