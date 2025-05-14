'use client';

import { Icons } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { ROUTER } from '@/libs/router';
import { useCartStore } from '@/stores/CartStore';
import Link from 'next/link';
import React from 'react';

const Cart = () => {
  const { carts } = useCartStore();

  return (
    <div>
      <Link href={ROUTER.CART} className="relative">
        <Button variant="transparent">
          <Icons.cart className="text-white" />
          <span className="ml-3">Cart</span>
        </Button>

        <div className="-top-6 -right-1 absolute flex h-6 w-6 items-center justify-center rounded-full bg-white text-primary-500 text-xs">
          {carts?.length}
        </div>
      </Link>

      {/* <VStack spacing={32} className="px-10">
        <H3 className="text-center font-semibold text-primary-600">My cart is empty</H3>

        <Button className="flex w-full items-center gap-2 rounded-full">Go to shopping</Button>
      </VStack> */}
    </div>
  );
};

export default Cart;
