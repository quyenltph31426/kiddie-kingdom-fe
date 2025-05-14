'use client';
import { Button } from '@/components/ui/button';
import { HStack } from '@/components/utilities';
import { useMobile } from '@/hooks/breakpoint';
import { useUserLogin } from '@/hooks/useUserLogin';
import { cn } from '@/libs/common';
import { ROUTER } from '@/libs/router';
import Image from 'next/image';
import Link from 'next/link';
import Cart from './Cart';
import SearchComponent from './SearchComponent';
import UserInfo from './UserInfo';

const Header = () => {
  const isMobile = useMobile();
  const { user } = useUserLogin();

  return (
    <header
      className={cn(
        'sticky top-0 right-0 z-40 w-full bg-primary-600 px-4 py-4 text-white shadow-header lg:px-8',
        !isMobile && ' h-header '
      )}
    >
      <HStack className="mx-auto max-w-[1440px]" pos="apart" spacing={isMobile ? 20 : 48}>
        <Link href={ROUTER.HOME}>
          <Image src="/images/logo.png" alt="logo" width={200} height={60} />
        </Link>

        <HStack className="flex-1">
          <SearchComponent />
        </HStack>

        <HStack pos="right" spacing={isMobile ? 8 : 48} className="">
          <Cart />

          {!user ? (
            <Link href={ROUTER.SIGN_IN}>
              <Button className="rounded-full">Sign In</Button>
            </Link>
          ) : (
            <UserInfo />
          )}
        </HStack>
      </HStack>
    </header>
  );
};

export default Header;
