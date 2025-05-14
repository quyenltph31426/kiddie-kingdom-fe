'use client';

import type { Control, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Show } from '@/components/utilities';
import { cn } from '@/libs/common';
import Variant from './Variant';

interface Props<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  label?: string;
  labelClassName?: string;
  required?: boolean;
  className?: string;
}

const VariantField = <T extends FieldValues>({ className, labelClassName, control, defaultValue, label, required, ...props }: Props<T>) => {
  return (
    <FormField
      defaultValue={defaultValue}
      control={control}
      name={props.name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl>
            <div className="space-y-1">
              <Show when={!!label}>
                <FormLabel className={cn('', labelClassName)}>
                  {label} {required && <span className="text-amaranth-600">*</span>}
                </FormLabel>
              </Show>
              <Variant value={field.value} onConfirm={field.onChange as any} />
              <FormMessage className="mt-1 text-xs" />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default VariantField;
