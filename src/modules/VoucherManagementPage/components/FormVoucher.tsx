import { TextField } from '@/components/form';
import { DatePickerField } from '@/components/form/DatePickerField';
import { SelectCustomField } from '@/components/form/SelectCustomField';
import { TextAreaField } from '@/components/form/TextAreaField';
import { Switch } from '@/components/ui/switch';
import { VStack } from '@/components/utilities';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import type { VoucherSchema } from '../libs/validators';

const FormVoucher = () => {
  const form = useFormContext<VoucherSchema>();

  const voucherTypeOptions = [
    { label: 'Percentage', value: 'PERCENTAGE' },
    { label: 'Fixed Amount', value: 'FIXED_AMOUNT' },
  ];

  return (
    <VStack spacing={16}>
      <TextField required control={form.control} name="code" label="Code" className="h-11" fullWidth />
      <TextField required control={form.control} name="name" label="Tên voucher" className="h-11" fullWidth />
      <TextAreaField control={form.control} name="description" label="Mô tả voucher" fullWidth />

      <SelectCustomField
        required
        name="type"
        label="Voucher Type"
        data={voucherTypeOptions}
        className="h-11"
        fullWidth
        control={form.control}
      />

      <TextField
        required
        control={form.control}
        name="value"
        label={form.watch('type') === 'PERCENTAGE' ? 'Giảm giá (% off)' : 'Giảm giá (VNĐ)'}
        type="number"
        className="h-11"
        fullWidth
      />

      <TextField
        required
        control={form.control}
        name="minOrderValue"
        label="Giá trị đơn hàng tối thiểu (VNĐ)"
        type="number"
        className="h-11"
        fullWidth
      />

      {form.watch('type') === 'PERCENTAGE' && (
        <TextField
          control={form.control}
          name="maxDiscountValue"
          label="Giá trị giảm tối đa (VNĐ)"
          type="number"
          className="h-11"
          fullWidth
        />
      )}

      <TextField
        required
        control={form.control}
        name="usageLimit"
        label="Số lượng sử dụng tối đa"
        type="number"
        className="h-11"
        fullWidth
      />

      <DatePickerField required control={form.control} name="startDate" label="Ngày bắt đầu" className="h-11" fullWidth />

      <DatePickerField required control={form.control} name="endDate" label="Ngày kết thúc" className="h-11" fullWidth />

      <div className="flex items-center space-x-2">
        <Switch id="isActive" checked={form.watch('isActive')} onCheckedChange={(checked) => form.setValue('isActive', checked)} />
        <label htmlFor="isActive" className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Kích hoạt
        </label>
      </div>
    </VStack>
  );
};

export default FormVoucher;
