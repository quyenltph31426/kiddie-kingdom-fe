'use client';
import { createProduct } from '@/api/product/requests';
import { Icons } from '@/assets/icons';
import H4 from '@/components/text/H4';
import { FormWrapper } from '@/components/ui/form';
import { Show, VStack } from '@/components/utilities';
import Container from '@/components/wrapper/Container';
import { cn, onMutateError } from '@/libs/common';
import { ROUTER } from '@/libs/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import BasicInformationTab from './components/BasicInformationTab';
import DetailInformationTab from './components/DetailInformationTab';
import OtherInformationTab from './components/OtherInformationTab';
import { TABS } from './libs/consts';
import { type ProductSchema, productSchema } from './libs/validators';

const CreateProductPage = () => {
  const [tab, setTab] = useState(TABS[0].value);
  const router = useRouter();
  const form = useForm<ProductSchema>({
    defaultValues: {
      name: '',
      description: '',
      type: 'simple',
      images: [],
      categories: [],
      primaryCategoryId: '',
      originalPrice: '0',
      brandId: '',
      variants: [],
      tags: [],
      specifications: {},
      isActive: true,
      isFeatured: false,
      isOnSale: false,
      isNewArrival: false,
      isBestSeller: false,
    },
    resolver: zodResolver(productSchema),
  });

  const { mutate, isLoading } = useMutation(createProduct);

  const handleSubmit = (formData: ProductSchema) => {
    const variants = formData.variants.map((x) => ({ ...x, price: +x.price, quantity: +x.quantity }));
    mutate(
      { ...formData, originalPrice: +formData.originalPrice as any, variants: variants as any },
      {
        onSuccess: () => {
          form.reset();
          toast.success('Create product successfully!');
          router.push(ROUTER.PRODUCT_MANAGEMENT);
        },
        onError: onMutateError,
      }
    );
  };
  return (
    <Container>
      <div className="flex">
        <div className="sticky top-10 h-fit w-[280px] rounded bg-primary-500 px-4 pt-3 pb-20">
          <H4 className="text-white">Progress</H4>

          <VStack className="mt-4">
            {TABS?.map((item) => (
              <div
                key={item.value}
                className={cn(
                  'flex cursor-pointer items-center justify-between rounded-sm p-2 text-grey-100 text-sm hover:bg-primary-100 hover:text-grey-600',
                  {
                    'bg-primary-300 text-black': tab === item.value,
                  }
                )}
                onClick={() => setTab(item.value)}
              >
                <span>{item.label}</span>
                <Icons.chevronDown className="-rotate-90 ml-2" />
              </div>
            ))}
          </VStack>
        </div>

        <div className="ml-6 flex-1 rounded bg-white p-4">
          <FormWrapper form={form} onSubmit={handleSubmit}>
            <Show when={tab === 'basic_information'}>
              <BasicInformationTab />
            </Show>

            <Show when={tab === 'detail_information'}>
              <DetailInformationTab />
            </Show>

            <Show when={tab === 'other_information'}>
              <OtherInformationTab />
            </Show>
          </FormWrapper>
        </div>
      </div>
    </Container>
  );
};

export default CreateProductPage;
