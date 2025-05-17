'use client';

import { useBrands } from '@/api/brand/queries';
import { useCategoriesQuery } from '@/api/category/queries';
import H3 from '@/components/text/H3';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { HStack, VStack } from '@/components/utilities';
import { cn } from '@/libs/common';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { LIST_PRICE_FILTER } from '../../libs/consts';

type Filter = {
  brandId?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
};

type Props = {
  onChange?: (filter: Partial<Filter>) => void;
};

const FilterLeftBar = ({ onChange }: Props) => {
  const [filter, setFilter] = useState<Partial<Filter>>({});

  const { data: categories, isFetching: isFetchingCategories } = useCategoriesQuery({ variables: { limit: 1000 } });
  const { data: brands, isFetching: isFetchingBrands } = useBrands({ variables: { limit: 1000 } });

  const searchParams = useSearchParams();
  const brand = searchParams.get('brand');
  const category = searchParams.get('category');
  const pathname = usePathname();

  useEffect(() => {
    onChange?.(filter);
  }, [filter]);

  return (
    <VStack className="w-[280px]" spacing={36}>
      <VStack spacing={32}>
        <H3 className="text-primary-600">Categories</H3>

        <VStack spacing={20} className="max-h-[300px] overflow-auto">
          {categories?.items?.map((item) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set('category', item.slug);

            const href = `${pathname}?${params.toString()}`;
            return (
              <Link
                href={href}
                key={item._id}
                className={cn('flex items-center justify-between rounded px-2 py-1 text-sm hover:bg-primary-200', {
                  'bg-primary-200': category === item.slug,
                })}
                onClick={() => setFilter((prev) => ({ ...prev, categoryId: item._id }))}
              >
                <span>{item.name}</span>

                <ChevronRight className="w-5" />
              </Link>
            );
          })}
        </VStack>
      </VStack>

      <Separator />

      <VStack spacing={20}>
        <H3 className="text-primary-600">Price (VND)</H3>

        <RadioGroup>
          <VStack spacing={16}>
            {LIST_PRICE_FILTER?.map((item) => (
              <Label className="flex cursor-pointer space-x-2 text-sm" key={item.value}>
                <RadioGroupItem value={item.value} />
                <span className="font-normal">{item.label}</span>
              </Label>
            ))}
          </VStack>
        </RadioGroup>
        <HStack noWrap className="px-8">
          <Separator className="flex-1 border-primary-400" />
          <span>or</span>
          <Separator className="flex-1 border-primary-400" />
        </HStack>
        <HStack noWrap>
          <Input
            type="number"
            placeholder="From (vnđ)"
            onChange={(e) => setFilter((prev) => ({ ...prev, minPrice: Number(e.target.value) }))}
          />
          <span>-</span>
          <Input
            type="number"
            placeholder="To (vnđ)"
            onChange={(e) => setFilter((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
          />
        </HStack>

        <Button size="sm" className="mx-8 rounded-full">
          Apply
        </Button>
      </VStack>

      <Separator />

      <VStack spacing={24}>
        <H3 className="text-primary-600">Brands</H3>

        <VStack spacing={20} className="max-h-[300px] overflow-auto">
          {brands?.items?.map((item) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set('brand', item.slug);

            const href = `${pathname}?${params.toString()}`;
            return (
              <Link
                href={href}
                key={item._id}
                className={cn('flex items-center justify-between rounded px-2 py-1 text-sm hover:bg-primary-200', {
                  'bg-primary-200': brand === item.slug,
                })}
                onClick={() => setFilter((prev) => ({ ...prev, brandId: item._id }))}
              >
                <span>{item.name}</span>

                <ChevronRight className="w-5" />
              </Link>
            );
          })}
        </VStack>
      </VStack>

      {/* <VStack spacing={20}>
        <H3 className="text-primary-600">Sex</H3>

        <RadioGroup>
          <VStack spacing={16}>
            {SEX_FILTER?.map((item) => (
              <Label className="flex cursor-pointer space-x-2 text-sm" key={item.value}>
                <RadioGroupItem value={item.value} />
                <span className="font-normal">{item.label}</span>
              </Label>
            ))}
          </VStack>
        </RadioGroup>
      </VStack> */}
    </VStack>
  );
};

export default FilterLeftBar;
