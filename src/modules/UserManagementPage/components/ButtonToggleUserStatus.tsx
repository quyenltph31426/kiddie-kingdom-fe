import { useToggleUserStatusMutation } from '@/api/user/queries';
import { AlertDialogComponent } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { onMutateError } from '@/libs/common';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface ButtonToggleUserStatusProps {
  userId: string;
  isActive: boolean;
  refetch: () => void;
}

const ButtonToggleUserStatus = ({ userId, isActive, refetch }: ButtonToggleUserStatusProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isLoading } = useToggleUserStatusMutation();

  const handleToggleStatus = () => {
    mutate(
      { id: userId, isActive: !isActive },
      {
        onSuccess: () => {
          toast.success(`User ${!isActive ? 'activated' : 'deactivated'} successfully`);
          setIsOpen(false);
          refetch();
        },
        onError: onMutateError,
      }
    );
  };

  return (
    <AlertDialogComponent
      onOk={handleToggleStatus}
      description={
        <div>
          <p className="line-clamp-4 font-medium text-base">
            {isActive
              ? 'Are you sure you want to deactivate this user? They will not be able to log in or use the platform until reactivated.'
              : 'Are you sure you want to activate this user? They will be able to log in and use the platform.'}
          </p>
        </div>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={isActive ? 'Deactivate User' : 'Activate User'}
      variant="alert"
      okText={isActive ? 'Deactivate' : 'Activate'}
      cancelText="Cancel"
      loading={isLoading}
    >
      <Button variant={isActive ? 'secondary' : 'default'} size="sm" onClick={() => setIsOpen(true)}>
        {isActive ? 'Deactivate' : 'Activate'}
      </Button>
    </AlertDialogComponent>
  );
};

export default ButtonToggleUserStatus;
