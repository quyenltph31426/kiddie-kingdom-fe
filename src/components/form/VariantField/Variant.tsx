'use client';

import { Icons } from '@/assets/icons';
import { TextField } from '@/components/form';
import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { HStack, VStack } from '@/components/utilities';
import { cn } from '@/libs/common';
import {
  type AttributeSchema,
  type ProductVariantSchema,
  type VariantSchema,
  variantSchema,
} from '@/modules/CreateProductPage/libs/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { isEqual } from 'lodash';
import { Save, Trash } from 'lucide-react';
import React, { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import VariantItem from './VariantItem';

type Props = {
  value: VariantSchema;
  onConfirm: (data: any[]) => void;
};
const Variant = ({ value, onConfirm }: Props) => {
  const form = useForm<VariantSchema>({
    defaultValues: {
      attributes: [{ name: '', values: [''] }],
      variants: [],
      results: [],
    },
    resolver: zodResolver(variantSchema),
  });

  const {
    fields,
    append: appendGroup,
    remove,
  } = useFieldArray({
    control: form.control,
    name: 'attributes',
  });

  const handleSubmit = (data: VariantSchema) => {
    onConfirm?.(data?.variants || []);
    toast.success('Save variant successfully!');
  };
  const keys = (form.watch('attributes') || []).map((x) => x.name);

  useEffect(() => {
    function generateVariants(attributes: AttributeSchema[]) {
      const result: ProductVariantSchema[] = [];
      const defaultVariants = form.getValues('variants') || [];

      function helper(index: number, currentAttributes: any) {
        if (index === attributes.length) {
          // Kiểm tra xem variant này đã tồn tại chưa
          const existing = defaultVariants.find((variant) => isEqual(variant.attributes, currentAttributes));

          if (existing) {
            result.push(existing);
          } else {
            result.push({
              attributes: currentAttributes as any,
              price: '0',
              quantity: '0',
              sku: String(Date.now()) + String(Math.floor(Math.random() * 10)),
            });
          }

          return;
        }

        const { name, values } = attributes[index];
        values.forEach((value) => {
          helper(index + 1, { ...currentAttributes, [name]: value });
        });
      }

      helper(0, {} as any);
      return result;
    }
    const variants = generateVariants(form.watch('attributes') || []);
    form.setValue('variants', variants);
  }, [JSON.stringify(form.watch('attributes'))]);

  useEffect(() => {
    if (value) {
      const attributeMap = new Map();

      ((value as any) || []).forEach((variant: any) => {
        for (const [key, value] of Object.entries(variant.attributes)) {
          if (!attributeMap.has(key)) {
            attributeMap.set(key, new Set());
          }
          attributeMap.get(key).add(value);
        }
      });

      const result = Array.from(attributeMap.entries()).map(([name, values]) => ({
        name,
        values: Array.from(values),
      }));
      if (result?.length > 0) {
        form.reset({ attributes: result as any, variants: value as any });
      }
    }
  }, [value]);

  console.log(value);

  return (
    <FormWrapper form={form} onSubmit={handleSubmit}>
      <div className="">
        <VStack spacing={20}>
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex ">
                <VariantItem key={field.id} index={index} />
                <div className="flex items-center rounded-e bg-primary-500 px-2">
                  <button type="button" className="text-white hover:text-grey-100" onClick={() => remove(index)}>
                    <Trash className="h-5 w-5 " />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </VStack>

        <Button size="sm" type="button" variant="dashed" onClick={() => appendGroup({ name: '', values: [''] })} className="mt-6 w-full">
          <Icons.plus /> Create Group
        </Button>
      </div>

      <div className="mt-10 flex">
        <div className="mr-2 w-[120px] text-sm">Product Classification List</div>

        <div className="flex-1 bg-grey-50 p-4">
          <div
            className={cn('grid rounded-t bg-primary-500 px-2 py-1 text-sm text-white')}
            style={{ gridTemplateColumns: `repeat(${keys.length + 3}, 1fr)` }}
          >
            {keys.map((key, index) => (
              <div key={index} className="text-center">
                {key}
              </div>
            ))}

            <div className="text-center">Price</div>
            <div className="text-center">Quantity</div>
            <div className="text-center">SKU</div>
          </div>
          {form.watch('variants').map((variant, index) => (
            <div
              className="grid gap-1 border-b py-1 text-sm"
              key={index}
              style={{ gridTemplateColumns: `repeat(${keys.length + 3}, 1fr)` }}
            >
              {keys.map((key, index) => (
                <div key={index} className="flex items-center justify-center text-center text-sm">
                  {variant.attributes[key] || 'N/A'}
                </div>
              ))}
              <div>
                <TextField className="h-9 bg-white" placeholder="Enter price" control={form.control} name={`variants.${index}.price`} />
              </div>
              <div>
                <TextField className="h-9 bg-white" placeholder="Enter price" control={form.control} name={`variants.${index}.quantity`} />
              </div>
              <div>
                <TextField className="h-9 bg-white" placeholder="Enter price" control={form.control} name={`variants.${index}.sku`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator className="mt-6" />
      <p className="mt-6 text-secondary-500 text-sm">Please save variant before continue</p>
      <HStack pos="right">
        <Button disabled={!form.formState.isValid} type="button" onClick={() => form.handleSubmit(handleSubmit)()}>
          <Save className="mr-2 w-4" />
          Save
        </Button>
      </HStack>
    </FormWrapper>
  );
};

export default Variant;
