'use client';

import { TextMaskField } from '@/components/form/TextMaskField';
import H3 from '@/components/text/H3';
import { FormLabel } from '@/components/ui/form';
import { VStack } from '@/components/utilities';
import { cn } from '@/libs/common';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import VariantField from '../../../../components/form/VariantField';
import type { ProductSchema } from '../../libs/validators';

const DetailInformationTab = () => {
  const form = useFormContext<ProductSchema>();
  return (
    <div>
      <H3>Detail Information</H3>

      <VStack className="mt-8" spacing={16}>
        <div className="">
          <TextMaskField required control={form.control} name="originalPrice" label="Original Price" placeholder="Price before discount" />
        </div>
        <div className="space-y-2">
          <FormLabel className={cn('mb-10 text-base')}>
            Variants <span className="text-amaranth-600">*</span>
          </FormLabel>
          <VariantField className="mt-2" name="variants" control={form.control} />
        </div>
      </VStack>
    </div>
  );
};

export default DetailInformationTab;
