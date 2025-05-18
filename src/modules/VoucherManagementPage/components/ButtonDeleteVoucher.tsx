'use client';

import { deleteVoucher } from '@/api/voucher/requests';
import { AlertDialogComponent } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { cn, onMutateError } from '@/libs/common';
import { useMutation } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
  _id: string;
  refetch: any;
  className?: string;
};

const ButtonDeleteVoucher = ({ _id, refetch, className }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { mutate, isLoading } = useMutation(deleteVoucher);

  const handleDelete = () => {
    mutate(_id, {
      onSuccess: () => {
        toast.success('Delete voucher successfully!');
        setIsOpenModal(false);
        refetch();
      },
      onError: onMutateError,
    });
  };

  return (
    <>
      <Button size="sm" variant="outline" className={cn('h-8 w-8 p-0', className)} onClick={() => setIsOpenModal(true)}>
        <Trash className="h-4 w-4" />
      </Button>

      <AlertDialogComponent
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        title="Are you sure you want to delete this voucher?"
        description="This action cannot be undone. This will permanently delete the voucher from our servers."
        onOk={handleDelete}
        okText={<>Delete</>}
        cancelText={<>Back</>}
        loading={isLoading}
      />
    </>
  );
};

export default ButtonDeleteVoucher;
