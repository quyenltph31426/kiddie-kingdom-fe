import { TextField, UploadButtonField } from '@/components/form';
import { SelectCustomField } from '@/components/form/SelectCustomField';
import { TextAreaField } from '@/components/form/TextAreaField';
import { Switch } from '@/components/ui/switch';
import { VStack } from '@/components/utilities';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import type { BannerSchema } from '../libs/validators';
import { BANNER_TYPES } from '../libs/validators';

const FormBanner = () => {
  const form = useFormContext<BannerSchema>();

  const bannerTypeOptions = BANNER_TYPES.map((type) => ({
    label: type.replace('_', ' '),
    value: type,
  }));

  return (
    <VStack spacing={16}>
      <TextField required control={form.control} name="title" label="Title" className="h-11" fullWidth />
      <TextField control={form.control} name="subtitle" label="Subtitle" className="h-11" fullWidth />
      <TextField control={form.control} name="link" label="Link URL" className="h-11" fullWidth />

      <SelectCustomField
        required
        name="type"
        label="Banner Type"
        data={bannerTypeOptions}
        className="h-11"
        fullWidth
        control={form.control}
      />

      <TextField
        required
        control={form.control}
        name="order"
        label="Display Order"
        type="number"
        className="h-11"
        fullWidth
        defaultValue="0"
      />

      <UploadButtonField
        accept={['png', 'jpg', 'jpeg']}
        control={form.control}
        name="image"
        label="Banner Image"
        maxSize={5}
        className="h-12"
        fullWidth
        previewClassNames={{
          image: 'object-contain md:aspect-[16/9] w-full h-[200px]',
          wrapper: 'md:aspect-[16/9] w-full h-[200px]',
        }}
      />

      <div className="flex items-center space-x-2">
        <Switch id="isActive" checked={form.watch('isActive')} onCheckedChange={(checked) => form.setValue('isActive', checked)} />
        <label htmlFor="isActive" className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Active
        </label>
      </div>
    </VStack>
  );
};

export default FormBanner;
