'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/libs/common';
import React, { useState } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { Input } from '../ui/input';
import { Show } from '../utilities';

type VariantProps = {
  value?: Record<string, string>;
  onConfirm: (val: Record<string, string>) => void;
};

type Props<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  required?: boolean;
  control: Control<T>;
  defaultValue?: any;
  className?: string;
  labelClassName?: string;
};

export const KeyValueDynamicField = <T extends FieldValues>({
  name,
  label,
  required,
  control,
  defaultValue,
  className,
  labelClassName,
}: Props<T>) => {
  return (
    <FormField
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          <FormControl>
            <div className="space-y-1">
              <Show when={!!label}>
                <FormLabel className={cn('', labelClassName)}>
                  {label} {required && <span className="text-amaranth-600">*</span>}
                </FormLabel>
              </Show>

              <KeyValueDynamic value={field.value} onConfirm={field.onChange as any} />

              <FormMessage className="mt-1 text-xs" />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export const KeyValueDynamic: React.FC<VariantProps> = ({ value = {}, onConfirm }) => {
  const [attributes, setAttributes] = useState(Object.entries(value).map(([key, val]) => ({ key, value: val })));

  const handleChange = (index: number, field: 'key' | 'value', newVal: string) => {
    const updated = [...attributes];
    updated[index][field] = newVal;
    setAttributes(updated);
    onConfirm(convertToObject(updated));
  };

  const handleAdd = () => {
    const updated = [...attributes, { key: '', value: '' }];
    setAttributes(updated);
    onConfirm(convertToObject(updated));
  };

  const handleRemove = (index: number) => {
    const updated = attributes.filter((_, i) => i !== index);
    setAttributes(updated);
    onConfirm(convertToObject(updated));
  };

  const convertToObject = (arr: { key: string; value: string }[]) => {
    return arr.reduce(
      (acc, curr) => {
        if (curr.key) acc[curr.key] = curr.value;
        return acc;
      },
      {} as Record<string, string>
    );
  };

  return (
    <div className="space-y-2">
      {attributes.map((attr, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Key"
            value={attr.key}
            onChange={(e) => handleChange(index, 'key', e.target.value)}
            className="flex-1 rounded border p-1"
            fullWidth
          />
          <Input
            type="text"
            placeholder="Value"
            value={attr.value}
            onChange={(e) => handleChange(index, 'value', e.target.value)}
            className="flex-1 rounded border p-1"
            fullWidth
          />
          <button type="button" onClick={() => handleRemove(index)} className="ml-4 text-red-500">
            X
          </button>
        </div>
      ))}

      <button type="button" onClick={handleAdd} className="text-primary-500 text-sm hover:underline">
        + Add attribute
      </button>
    </div>
  );
};
