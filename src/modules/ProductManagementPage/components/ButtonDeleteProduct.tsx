'use client';
import { deleteProduct } from '@/api/product/requests';
import type { IProduct } from '@/api/product/types';
import { AlertDialogComponent } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { cn, onMutateError } from '@/libs/common';
import { useMutation } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ButtonDeleteProduct = ({ _id, name, refetch, totalSoldCount }: Partial<IProduct> & { refetch: any }) => {
  const [isDeleteConfirm, setIsDeleteConfirm] = useState<boolean>(false);
  const { mutate, isLoading } = useMutation(deleteProduct);

  const handleRemoveBattle = () => {
    if (totalSoldCount && totalSoldCount > 0) {
      toast.error('Không thể xóa sản phẩm đã có người mua!');
      return;
    }
    mutate(String(_id), {
      onSuccess: async () => {
        refetch();
        toast.success('Xóa sản phẩm thành công!');
      },
      onError: onMutateError,
    });
    return;
  };

  return (
    <AlertDialogComponent
      onOk={handleRemoveBattle}
      description={
        <div>
          <p className="line-clamp-4 font-medium text-base">
            <span className="text-grey-600">Bạn có chắc chắn muốn xóa sản phẩm</span> "{name}"?
          </p>
        </div>
      }
      isOpen={isDeleteConfirm}
      setIsOpen={setIsDeleteConfirm}
      title="Xóa sản phẩm"
      variant="alert"
      okText={<>Delete</>}
      cancelText={<>Back</>}
      loading={isLoading}
    >
      <Button
        onClick={() => setIsDeleteConfirm(true)}
        className={cn('hover:opacity-80', {
          'cursor-not-allowed opacity-60 hover:opacity-60': false,
        })}
        size="xs"
        type="button"
      >
        <Trash className="h-5 w-5" />
      </Button>
    </AlertDialogComponent>
  );
};

export default ButtonDeleteProduct;
