'use client';

import { userLogout } from '@/api/auth/requests';
import { Icons } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HStack, VStack } from '@/components/utilities';
import { useUserLogin } from '@/hooks/useUserLogin';
import { ROUTER } from '@/libs/router';
import { useUserStore } from '@/stores/UserStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next-nprogress-bar';
import Image from 'next/image';
import React from 'react';

const UserInfo = () => {
  const { user } = useUserLogin();
  const { logout } = useUserStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate } = useMutation(userLogout);

  const handleLogout = async () => {
    // mutate(undefined, {
    //   onSuccess: () => {
    router.replace(ROUTER.SIGN_IN);
    queryClient.clear();
    logout();
    deleteCookie('access_token');
    deleteCookie('refresh_token');
    //   },
    //   onError: onMutateError,
    // });
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button>
            <HStack spacing={12}>
              <Image src={user?.avatar || '/images/no-image.svg'} alt="Avatar" width={56} height={56} className="h-7 w-7 rounded-full" />
              <span>{user?.username || '--'}</span>

              <Icons.chevronDown />
            </HStack>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="flex flex-col gap-6 p-3">
          <VStack spacing={16}>
            <HStack spacing={20}>
              <Image src={user?.avatar || '/images/no-image.svg'} alt="Avatar" width={40} height={40} className="h-10 w-10 rounded-full" />

              <VStack className=" text-base">
                <span className="">{user?.username || '--'}</span>
              </VStack>
            </HStack>
          </VStack>

          <Button className="flex w-full items-center gap-2" onClick={handleLogout}>
            <Icons.logout />
            Log Out
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UserInfo;
