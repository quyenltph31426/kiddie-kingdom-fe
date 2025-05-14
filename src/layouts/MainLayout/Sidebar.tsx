'use client';

import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect } from 'react';

import { Icons } from '@/assets/icons';
import { Separator } from '@/components/ui/separator';
import { HStack, Show, VStack } from '@/components/utilities';
import { useMobile, useTablet } from '@/hooks/breakpoint';
import { cn } from '@/libs/common';
import { ROUTER } from '@/libs/router';
import { useAppStore } from '@/stores/AppStore';
import { useUserStore } from '@/stores/UserStore';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { sidebars } from './libs/consts';

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const { openSideBar, toggleSidebar, setOpenSideBar } = useAppStore();
  const { user } = useUserStore();
  const isTablet = useTablet();
  const isMobile = useMobile();

  const handleLogout = () => {
    queryClient.clear();
    router.replace(ROUTER.SIGN_IN);

    toast.success('Logout successfully!');
  };

  useEffect(() => {
    if (isMobile) {
      setOpenSideBar('HIDDEN');
      return;
    }
    if (isTablet) {
      setOpenSideBar('ZOOM-OUT');
    }
  }, [isTablet, setOpenSideBar, isMobile]);

  return (
    <VStack
      spacing={0}
      className={cn('fixed top-0 bottom-0 left-0 z-50 border-r bg-[#333333] transition-all duration-300', {
        'w-64': openSideBar === 'SHOW',
        'w-[92px]': openSideBar === 'ZOOM-OUT',
        'w-6': openSideBar === 'HIDDEN',
      })}
    >
      <Show when={openSideBar !== 'HIDDEN'}>
        <Link href="/">
          <HStack pos="center" className={cn('py-8', openSideBar ? 'px-4' : 'px-0')} noWrap>
            <Image src="/images/logo.png" alt="logo" width={200} height={60} />
          </HStack>
        </Link>
      </Show>

      <div className="px-6 pb-6">
        <Separator className="w-[content] rounded-sm border-primary-400 border-t-[2px]" />
      </div>

      <div onClick={toggleSidebar} className={cn('group -right-4 absolute top-24 cursor-pointer')}>
        <Icons.toggleSideBar className="group-hover:stroke-primary-400" />
      </div>

      <Show when={openSideBar !== 'HIDDEN'}>
        <div className="scrollbar-transparent scrollbar-1 flex-1 overflow-y-auto">
          <div className={cn('pb-4 font-medium text-sm text-white', !openSideBar ? 'text-center' : 'ml-7')}>MAIN</div>

          <VStack className="mb-6" spacing={8}>
            {sidebars.map((sidebar, index) => {
              if (sidebar.line) {
                return (
                  <div className="px-6" key={index}>
                    <Separator className="w-[content] rounded-sm border-primary-400 border-t" />
                  </div>
                );
              }

              // const isShow = !sidebar.access || sidebar.access.includes(user?.permissions);
              // if (!isShow) return null;
              return (
                <Link href={sidebar.link || ''} key={index}>
                  <HStack
                    spacing={16}
                    pos={!openSideBar ? 'center' : null}
                    noWrap
                    className={cn('px-7 py-4 font-medium text-white hover:bg-primary-300', {
                      'bg-primary-500': pathname === sidebar.link,
                    })}
                  >
                    {pathname === sidebar.link && sidebar?.iconActive ? sidebar?.iconActive : sidebar.icon}
                    <Show when={openSideBar === 'SHOW'}>
                      <span className="mt-[1px] text-sm">{sidebar.title}</span>
                    </Show>
                  </HStack>
                </Link>
              );
            })}
          </VStack>
        </div>

        <VStack className="mb-6 pt-2" spacing={8}>
          <div className="px-6">
            <Separator className="w-[content] rounded-sm border-primary-400 border-t-[2px]" />
          </div>
          <Link href="">
            <HStack spacing={20} noWrap className="px-8 py-4 text-grey-100 text-sm hover:bg-[#6AA65B]">
              <Icons.help />
              <Show when={openSideBar === 'SHOW'}>
                <span className="mt-[1px] font-medium">Help</span>
              </Show>
            </HStack>
          </Link>

          <HStack
            spacing={20}
            noWrap
            className="cursor-pointer px-8 py-4 text-grey-100 text-sm hover:bg-primary-300"
            onClick={handleLogout}
          >
            <Icons.logout />
            <Show when={openSideBar === 'SHOW'}>
              <span className="font-medium">Logout Account</span>
            </Show>
          </HStack>
        </VStack>
      </Show>
    </VStack>
  );
};

export default Sidebar;
