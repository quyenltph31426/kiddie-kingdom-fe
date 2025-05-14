import { TextField, UploadButtonField } from '@/components/form';
import { TextAreaField } from '@/components/form/TextAreaField';
import { VStack } from '@/components/utilities';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import type { BrandSchema } from '../libs/validators';

const FormBrand = () => {
  const form = useFormContext<BrandSchema>();
  return (
    <VStack spacing={16}>
      <TextField required control={form.control} name="name" label="Name" className="h-11" fullWidth />
      <TextField required control={form.control} name="website" label="Website" className="h-11" fullWidth />

      <TextAreaField required control={form.control} name="description" label="Description" className="h" fullWidth />

      <UploadButtonField
        accept={['png', 'jpg', 'jpeg']}
        control={form.control}
        name="logo"
        label="Logo"
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

export default FormBrand;
