'use client';

import { deleteBanner } from '@/api/banner/requests';
import { Icons } from '@/assets/icons';
import { AlertDialogComponent } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { cn, onMutateError } from '@/libs/common';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
  _id: string;
  refetch: any;
  className?: string;
};

const ButtonDeleteBanner = ({ _id, refetch, className }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { mutate, isLoading } = useMutation(deleteBanner);

  const handleDelete = () => {
    mutate(_id, {
      onSuccess: () => {
        toast.success('Delete banner successfully!');
        setIsOpenModal(false);
        refetch();
      },
      onError: onMutateError,
    });
  };

  return (
    <AlertDialogComponent
      isOpen={isOpenModal}
      setIsOpen={setIsOpenModal}
      title="Are you sure you want to delete this banner?"
      description="This action cannot be undone. This will permanently delete the banner from our servers."
      onOk={handleDelete}
      okText={<>Delete</>}
      cancelText={<>Back</>}
      loading={isLoading}
    />
  );
};

export default ButtonDeleteBanner;
