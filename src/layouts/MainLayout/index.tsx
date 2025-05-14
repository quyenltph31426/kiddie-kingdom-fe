import { type ReactNode, useEffect } from 'react';

import { useAppStore } from '@/stores/AppStore';
import type { FCC } from '@/types';

import { HStack } from '@/components/utilities';
import { useUserLogin } from '@/hooks/useUserLogin';
import { cn } from '@/libs/common';
import { ROUTER } from '@/libs/router';
import { useRouter } from 'next/navigation';
import Header from './Header';
// import Footer from './Footer';
import Sidebar from './Sidebar';

interface Props {
  children: ReactNode;
}

const MainLayout: FCC<Props> = ({ children }) => {
  const { openSideBar } = useAppStore();
  const { isLoggedIn, isFetching } = useUserLogin();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn && !isFetching) router.replace(ROUTER.SIGN_IN);
  }, [isLoggedIn, isFetching]);

  if (!isLoggedIn && !isFetching) return <></>;

  return (
    <div className="overflow-clip">
      <Sidebar />

      <HStack className="" spacing={0} noWrap>
        <div
          className={cn('transition-all duration-300', {
            'w-64': openSideBar === 'SHOW',
            'w-[92px]': openSideBar === 'ZOOM-OUT',
            'w-6': openSideBar === 'HIDDEN',
          })}
        ></div>

        <div className="flex-1 bg-[#F5F5F5]">
          <Header />
          <main className="min-h-screen">{children}</main>
          {/* <Footer /> */}
        </div>
      </HStack>
    </div>
  );
};

export default MainLayout;
