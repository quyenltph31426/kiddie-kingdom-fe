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
      <H3>Thông tin cơ bản</H3>

      <VStack className="mt-6" spacing={24}>
        <div className=""></div>
        <UploadImagesField control={form.control} name="images" label="Images" accept={['png', 'jpg', 'jpeg', 'svg', 'webp']} />

        <TextField
          required
          control={form.control}
          placeholder="Nhập tên sản phẩm"
          name="name"
          label="Tên sản phẩm"
          className="h-11"
          fullWidth
        />

        <QuillEditorField control={form.control} required name="description" label="Mô tả sản phẩm" className="h" fullWidth />
      </VStack>
    </div>
  );
};

export default BasicInformationTab;
