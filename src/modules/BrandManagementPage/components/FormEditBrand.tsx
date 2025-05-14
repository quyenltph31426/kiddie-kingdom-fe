import { useBrandByIdQuery } from '@/api/brand/queries';
import { updateBrand } from '@/api/brand/requests';
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
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { type BrandSchema, brandSchema } from '../libs/validators';
import FormCategory from './FormBrand';

type Props = {
  refetch: any;
  _id: string;
};
const FormEditBrand = ({ refetch, _id }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { mutate, isLoading } = useMutation(updateBrand);
  useBrandByIdQuery({
    variables: String(_id),
    enabled: Boolean(_id && isOpenModal),
    onSuccess: (data) => {
      form.reset(data);
    },
    onError: onMutateError,
  });

  const form = useForm<BrandSchema>({
    defaultValues: {
      logo: '',
      website: '',
      name: '',
      description: '',
    },
    resolver: zodResolver(brandSchema),
  });

  const handleSubmit: SubmitHandler<BrandSchema> = async (formData) => {
    mutate(
      { formData, id: String(_id) },
      {
        onSuccess: () => {
          toast.success('Update the category successfully!');
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
        <Button size="xs" variant="secondary">
          <Pen className="mr-1 h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[92vh] max-w-[520px] overflow-y-auto rounded-t-md border-none p-0 shadow-none">
        <div className="px-6 py-2 lg:px-10">
          <HStack pos="apart" noWrap align="center">
            <HStack className="mt-3 h-12 w-12 rounded-full border bg-[#4D9E2A26] " pos="center">
              <Icons.user className="w-5 stroke-primary-400" />
            </HStack>

            <span className="cursor-pointer rounded-sm p-1 hover:bg-grey-100" onClick={() => setIsOpenModal(false)}>
              <Icons.X className="stroke-grey-500" />
            </span>
          </HStack>

          <H3 className="mt-4">Edit Category</H3>

          <div className="my-6">
            <FormWrapper form={form} onSubmit={handleSubmit}>
              <FormCategory />
              <HStack pos="center" spacing={20} className="mt-10">
                <Button size="sm" variant="outline" className="flex-1 px-6" onClick={() => setIsOpenModal(false)}>
                  Cancel
                </Button>

                <Button type="submit" size="sm" className="flex-1 px-6" loading={isLoading} disabled={!form.formState.isDirty || isLoading}>
                  Update
                </Button>
              </HStack>
            </FormWrapper>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormEditBrand;
