import { useBrands } from '@/api/brand/queries';
import { useCategoriesQuery } from '@/api/category/queries';
import { SwitchField } from '@/components/form';
import { KeyValueDynamicField } from '@/components/form/KeyValueDynamicField';
import { SelectCustomField } from '@/components/form/SelectCustomField';
import { SelectMultiCustomField } from '@/components/form/SelectMultiCustomField';
import H3 from '@/components/text/H3';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { HStack, VStack } from '@/components/utilities';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import type { ProductSchema } from '../../libs/validators';

const OtherInformationTab = () => {
  const form = useFormContext<ProductSchema>();

  const { data: categories } = useCategoriesQuery({ variables: { limit: 10000 } });
  const { data: brands } = useBrands({ variables: { limit: 10000 } });

  const handleTrigger = async () => {
    const isConfirm = await form.trigger();

    if (!isConfirm) {
      const errors = form.formState.errors;
      const firstKey = Object.keys(errors)[0];
      const firstError = (errors as any)[firstKey];
      toast.error(`The field '${firstKey}': ${firstError.message}` || 'Please fill in all required fields.');
    }
  };

  return (
    <div>
      <H3>Thông tin khác</H3>

      <VStack className="mt-6" spacing={24}>
        <SelectCustomField
          required
          control={form.control}
          name="brandId"
          label="Thương hiệu"
          data={(brands?.items || []).map((x) => ({ label: x.name, value: x._id }))}
        />
        <SelectCustomField
          required
          control={form.control}
          name="primaryCategoryId"
          label="Danh mục chính"
          data={(categories?.items || []).map((x) => ({ label: x.name, value: x._id }))}
        />

        <SelectMultiCustomField
          required
          control={form.control}
          name="categories"
          label="Danh mục phụ"
          data={(categories?.items || [])
            .filter((x) => x._id !== form.getValues('primaryCategoryId'))
            .map((x) => ({ label: x.name, value: x._id }))}
        />

        <HStack pos="apart">
          <SwitchField control={form.control} name="isNewArrival" label="Đánh dấu sản phẩm mới" />
          <SwitchField control={form.control} name="isFeatured" label="Đánh dấu sản phẩm nổi bật" />
          <SwitchField control={form.control} name="isOnSale" label="Đánh dấu sản phẩm giảm giá" />
        </HStack>

        <KeyValueDynamicField control={form.control} name="specifications" label="Thông số kỹ thuật" />
      </VStack>

      <Separator className="my-10" />
      <p className="text-sm">Sản phẩm của bạn đã sẵn sàng để xuất bản</p>
      <HStack pos="right">
        <Button type="submit" onClick={handleTrigger}>
          Xuất bản sản phẩm
        </Button>
      </HStack>
    </div>
  );
};

export default OtherInformationTab;
