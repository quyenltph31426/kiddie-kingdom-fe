'use client';

import React, { useId } from 'react';
import type { Control, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Switch } from '../ui/switch';
import { Show, VStack } from '../utilities';

interface SwitchProps<T extends FieldValues = FieldValues> {
  isChecked?: boolean;
  control: Control<T>;
  name: FieldPath<T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  label?: React.ReactNode;
  labelClassName?: string;
  required?: boolean;
}

const SwitchField = <T extends FieldValues>({ label, labelClassName, required, control, name, ...props }: SwitchProps<T>) => {
  const id = useId();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <VStack>
            <Show when={!!label}>
              <FormLabel className={labelClassName}>
                {label} {required && <span className="text-red-500">*</span>}
              </FormLabel>
            </Show>
            <FormControl>
              <Switch id={id} checked={field.value} onCheckedChange={field.onChange} {...props} />
            </FormControl>
          </VStack>
        </FormItem>
      )}
    />
  );
};

export { SwitchField };
