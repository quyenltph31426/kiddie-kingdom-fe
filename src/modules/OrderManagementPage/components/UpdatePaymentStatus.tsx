'use client';

import { useUpdatePaymentStatusMutation } from '@/api/order/queries';
import { PaymentStatus, type PaymentStatusType } from '@/api/order/types';
import { Icons } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { HStack, VStack } from '@/components/utilities';
import { onMutateError } from '@/libs/common';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { PAYMENT_STATUS_OPTIONS, getValidPaymentStatusTransitions } from '../libs/consts';

interface UpdatePaymentStatusProps {
  orderId: string;
  currentStatus: PaymentStatusType;
  refetch: () => void;
}

const UpdatePaymentStatus = ({ orderId, currentStatus, refetch }: UpdatePaymentStatusProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<PaymentStatusType>(currentStatus);

  const { mutate, isLoading } = useUpdatePaymentStatusMutation();
  const validNextStatuses = getValidPaymentStatusTransitions(currentStatus);

  const handleUpdateStatus = () => {
    if (selectedStatus === currentStatus) {
      setIsOpen(false);
      return;
    }

    mutate(
      { id: orderId, status: selectedStatus },
      {
        onSuccess: () => {
          toast.success('Payment status updated successfully');
          setIsOpen(false);
          refetch();
        },
        onError: onMutateError,
      }
    );
  };

  return (
    <>
      <Button variant="ghost" size="icon" className="ml-1 h-6 w-6" onClick={() => setIsOpen(true)}>
        <Pencil className="h-3 w-3" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Payment Status</DialogTitle>
          </DialogHeader>

          <VStack spacing={16} className="py-4">
            <RadioGroup
              value={selectedStatus}
              onValueChange={(value) => setSelectedStatus(value as PaymentStatusType)}
              className="space-y-3"
            >
              {Object.values(PaymentStatus).map((value) => {
                const isDisabled = !validNextStatuses.includes(value as PaymentStatusType) && value !== currentStatus;
                return (
                  <div key={value} className="flex items-center space-x-2">
                    <RadioGroupItem value={value} id={`payment-${value}`} disabled={isDisabled} />
                    <label
                      htmlFor={`payment-${value}`}
                      className={`font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                        value === selectedStatus ? 'text-primary' : ''
                      } ${isDisabled ? 'text-gray-400' : ''}`}
                    >
                      {PAYMENT_STATUS_OPTIONS.find((option) => option.value === value)?.label || value}
                      {isDisabled && value !== currentStatus && ' (invalid transition)'}
                    </label>
                  </div>
                );
              })}
            </RadioGroup>
          </VStack>

          <HStack pos="apart" className="mt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateStatus} disabled={isLoading || selectedStatus === currentStatus}>
              {isLoading ? <Icons.spinner className="h-4 w-4 animate-spin" /> : 'Update Status'}
            </Button>
          </HStack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdatePaymentStatus;
