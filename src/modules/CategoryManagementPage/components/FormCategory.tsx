import { TextField, UploadButtonField } from '@/components/form';
import { TextAreaField } from '@/components/form/TextAreaField';
import { VStack } from '@/components/utilities';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import type { CategorySchema } from '../libs/validators';

const FormCategory = () => {
  const form = useFormContext<CategorySchema>();
  return (
    <VStack spacing={16}>
      <TextField required control={form.control} name="name" label="Tên danh mục" className="h-12" fullWidth />

      <TextAreaField required control={form.control} name="description" label="Mô tả" className="h" fullWidth />

      <UploadButtonField
        accept={['png', 'jpg', 'jpeg', 'svg', 'webp']}
        control={form.control}
        name="image"
        label="Image"
        maxSize={3}
        className="h-12"
        fullWidth
        previewClassNames={{
          image: 'object-contain md:aspect-[1/1] w-[200px] h-[200px]',
          wrapper: 'md:aspect-[1/1] w-[200px] h-[200px]',
        }}
      />
    </VStack>
  );
};

export default FormCategory;
