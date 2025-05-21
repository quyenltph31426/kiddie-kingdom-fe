'use client';

import { useVoucherByIdQuery } from '@/api/voucher/queries';
import { updateVoucher } from '@/api/voucher/requests';
import { Icons } from '@/assets/icons';
import H3 from '@/components/text/H3';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FormWrapper } from '@/components/ui/form';
import { HStack } from '@/components/utilities';
import { onMutateError } from '@/libs/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Pen } from 'lucide-react';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { type VoucherSchema, voucherSchema } from '../libs/validators';
import FormVoucher from './FormVoucher';

type Props = {
  refetch: any;
  _id: string;
};

const FormEditVoucher = ({ refetch, _id }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { mutate, isLoading } = useMutation(updateVoucher);

  useVoucherByIdQuery({
    variables: String(_id),
    enabled: Boolean(_id && isOpenModal),
    onSuccess: (data) => {
      const formData = {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        value: String(data.value),
        minOrderValue: String(data.minOrderValue),
        maxDiscountValue: String(data.maxDiscountValue),
        usageLimit: String(data.usageLimit),
      };
      form.reset(formData as any);
    },
    onError: onMutateError,
  });

  const form = useForm<VoucherSchema>({
    defaultValues: {
      code: '',
      name: '',
      description: '',
      type: 'PERCENTAGE',
      value: '0',
      minOrderValue: '0',
      maxDiscountValue: '0',
      usageLimit: '0',
      startDate: new Date(),
      endDate: new Date(),
      isActive: true,
    },
    resolver: zodResolver(voucherSchema),
  });

  const handleSubmit: SubmitHandler<VoucherSchema> = async (formData) => {
    mutate(
      {
        formData,
        id: String(_id),
        value: Number(formData.value) as any,
        minOrderValue: Number(formData.minOrderValue) as any,
        maxDiscountValue: Number(formData.maxDiscountValue) as any,
        usageLimit: Number(formData.usageLimit) as any,
      } as any,
      {
        onSuccess: () => {
          toast.success('Cập nhật voucher thành công!');
          setIsOpenModal(false);
          refetch();
        },
        onError: onMutateError,
      }
    );
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
          <Pen className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[92vh] max-w-[520px] overflow-y-auto rounded-t-md border-none p-0 shadow-none">
        <div className="px-6 py-2">
          <HStack pos="apart" noWrap align="center">
            <HStack className="mt-3 h-12 w-12 rounded-full border bg-[#4D9E2A26] " pos="center">
              {/* <Icons.voucher className="w-5 stroke-primary-400" /> */}
            </HStack>

            <span className="cursor-pointer rounded-sm p-1 hover:bg-grey-100" onClick={() => setIsOpenModal(false)}>
              <Icons.X className="stroke-grey-500" />
            </span>
          </HStack>

          <H3 className="mt-4">Cập nhật voucher</H3>

          <div className="my-6">
            <FormWrapper form={form} onSubmit={handleSubmit}>
              <FormVoucher />
              <HStack pos="center" spacing={20} className="mt-10">
                <Button size="sm" variant="outline" className="flex-1 px-6" onClick={() => setIsOpenModal(false)}>
                  Hủy
                </Button>

                <Button type="submit" size="sm" className="flex-1 px-6" loading={isLoading} disabled={!form.formState.isDirty || isLoading}>
                  Cập nhật
                </Button>
              </HStack>
            </FormWrapper>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormEditVoucher;
