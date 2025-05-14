'use client';

import { useCategoriesQuery } from '@/api/category/queries';
import H3 from '@/components/text/H3';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { HStack, VStack } from '@/components/utilities';
import { ROUTER } from '@/libs/router';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { LIST_PRICE_FILTER, SEX_FILTER } from '../../libs/consts';

const FilterLeftBar = () => {
  const { data, isFetching } = useCategoriesQuery({ variables: { limit: 1000 } });
  return (
    <VStack className="w-[280px]" spacing={36}>
      <VStack spacing={32}>
        <H3 className="text-primary-600">Categories</H3>

        <VStack spacing={20}>
          {data?.items?.map((item) => (
            <Link
              href={`${ROUTER.COLLECTIONS}/${item.slug}`}
              key={item._id}
              className="flex items-center justify-between rounded px-2 py-1 text-sm hover:bg-primary-200"
            >
              <span>{item.name}</span>

              <ChevronRight className="w-5" />
            </Link>
          ))}
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
          <Input placeholder="From (vnđ)" />
          <span>-</span>
          <Input placeholder="To (vnđ)" />
        </HStack>

        <Button size="sm" className="mx-8 rounded-full">
          Apply
        </Button>
      </VStack>

      <Separator />

      <VStack spacing={20}>
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
      </VStack>
    </VStack>
  );
};

export default FilterLeftBar;
