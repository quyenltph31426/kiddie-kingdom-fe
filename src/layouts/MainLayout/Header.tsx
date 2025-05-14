'use client';

import { Separator } from '@/components/ui/separator';
import { HStack } from '@/components/utilities';
import { useMobile } from '@/hooks/breakpoint';
import { cn } from '@/libs/common';
import { ROUTER } from '@/libs/router';
import { useAppStore } from '@/stores/AppStore';
import { useUserStore } from '@/stores/UserStore';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import UserInfo from './UserInfo';

const Header = () => {
  const isMobile = useMobile();
  const queryClient = useQueryClient();

  const openSideBar = useAppStore.use.openSideBar();
  const router = useRouter();
  const { user, setUser } = useUserStore();

  const handleLogout = () => {
    setUser({} as any);
    queryClient.clear();
    router.replace(ROUTER.SIGN_IN);
    toast.success('Logout successfully!');
  };

  return (
    <header
      className={cn(
        'sticky top-0 right-0 z-40 flex w-full items-center justify-between bg-white px-4 py-4 shadow-header lg:px-8',
        !isMobile && ' h-header '
      )}
    >
      <HStack className="w-full" pos="apart">
        <HStack spacing={48}>
          <Separator orientation="vertical" className="hidden h-9 lg:block" />
        </HStack>

        <HStack pos="right" spacing={isMobile ? 8 : 48} className="">
          <UserInfo />
        </HStack>
      </HStack>
    </header>
  );
};

export default Header;
