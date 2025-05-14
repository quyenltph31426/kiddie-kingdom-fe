'use client';

import { TextField } from '@/components/form';
import { QuillEditorField } from '@/components/form/QuillEditorField';
import H3 from '@/components/text/H3';
import { VStack } from '@/components/utilities';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import type { ProductSchema } from '../../libs/validators';
import { UploadImagesField } from '@/components/form/UploadImagesField';

const BasicInformationTab = () => {
  const form = useFormContext<ProductSchema>();
  return (
    <div>
      <H3>Basic Information</H3>

      <VStack className="mt-6" spacing={24}>
        <div className=""></div>
        <UploadImagesField control={form.control} name="images" label="Images" accept={['png', 'jpeg', 'webp']} />

        <TextField required control={form.control} placeholder="Enter product name" name="name" label="Name" className="h-11" fullWidth />

        <QuillEditorField control={form.control} required name="description" label="Description" className="h" fullWidth />
      </VStack>
    </div>
  );
};

export default BasicInformationTab;
