'use client';

import { createBanner } from '@/api/banner/requests';
import { Icons } from '@/assets/icons';
import H3 from '@/components/text/H3';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FormWrapper } from '@/components/ui/form';
import { HStack } from '@/components/utilities';
import { onMutateError } from '@/libs/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { type BannerSchema, bannerSchema } from '../libs/validators';
import FormBanner from './FormBanner';

type Props = {
  refetch: any;
};

const FormCreateBanner = ({ refetch }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { mutate, isLoading } = useMutation(createBanner);

  const form = useForm<BannerSchema>({
    defaultValues: {
      title: '',
      subtitle: '',
      image: '',
      link: '',
      type: 'HOME_HERO',
      order: '0',
      isActive: true,
    },
    resolver: zodResolver(bannerSchema),
  });

  const handleSubmit: SubmitHandler<BannerSchema> = async (formData) => {
    mutate(
      { ...formData, order: Number(formData.order) as any },
      {
        onSuccess: () => {
          toast.success('Create new banner successfully!');
          setIsOpenModal(false);
          form.reset();
          refetch();
        },
        onError: onMutateError,
      }
    );
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger asChild>
        <Button>
          <Icons.plus />
          Create
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[92vh] max-w-[520px] overflow-y-auto rounded-t-md border-none p-0 shadow-none">
        <div className="px-6 py-2">
          <HStack pos="apart" noWrap align="center">
            <HStack className="mt-3 h-12 w-12 rounded-full border bg-[#4D9E2A26] " pos="center">
              {/* <Icons.image className="w-5 stroke-primary-400" /> */}
            </HStack>

            <span className="cursor-pointer rounded-sm p-1 hover:bg-grey-100" onClick={() => setIsOpenModal(false)}>
              <Icons.X className="stroke-grey-500" />
            </span>
          </HStack>

          <H3 className="mt-4">Create New Banner</H3>

          <div className="my-6">
            <FormWrapper form={form} onSubmit={handleSubmit}>
              <FormBanner />
              <HStack pos="center" spacing={20} className="mt-10">
                <Button size="sm" variant="outline" className="flex-1 px-6" onClick={() => setIsOpenModal(false)}>
                  Cancel
                </Button>

                <Button type="submit" size="sm" className="flex-1 px-6" loading={isLoading} disabled={!form.formState.isDirty || isLoading}>
                  Create New
                </Button>
              </HStack>
            </FormWrapper>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormCreateBanner;
