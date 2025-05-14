'use client';

import Breadcrumb from '@/components/Breadcrumb';
import H3 from '@/components/text/H3';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FormWrapper } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { HStack, VStack } from '@/components/utilities';
import Container from '@/components/wrapper/Container';
import { formatNumber } from '@/libs/utils';
import { useCartStore } from '@/stores/CartStore';
import React from 'react';
import { useForm } from 'react-hook-form';

const CartPage = () => {
  const form = useForm();
  const { carts } = useCartStore();

  console.log(carts);

  const handleSubmit = () => {};
  return (
    <div className="bg-[#F5F5F5] pb-10">
      <Breadcrumb breadcrumbs={[{ name: 'Home' }, { name: 'Cart' }]} className="bg-white" />

      <Container className="mt-8 text-sm">
        <H3>My Cart</H3>

        <FormWrapper form={form} onSubmit={handleSubmit}>
          <div className="mt-10 grid grid-cols-[2.5fr_1fr_1fr_1fr_1fr] rounded bg-white p-3">
            <HStack spacing={12}>
              <Checkbox />
              <span>Product</span>
            </HStack>

            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
            <div className="text-center">Action</div>
          </div>

          <VStack className="mt-4 rounded bg-white px-3 py-5" spacing={16}>
            {carts?.map((cart, index) => (
              <React.Fragment key={cart._id}>
                {index !== 0 && <Separator />}

                <div className="grid grid-cols-[2.5fr_1fr_1fr_1fr_1fr]">
                  <HStack align="start" spacing={12}>
                    <Checkbox />
                    <VStack>
                      <p className="line-clamp-2">{cart.name}</p>

                      <div className="">
                        {cart.attributes && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {Object.entries(cart.attributes).map(([key, value]) => (
                              <div key={key} className="rounded bg-primary-100 px-2 py-1 text-xs">
                                {value}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </VStack>{' '}
                  </HStack>

                  <span>{formatNumber(cart.price)}</span>
                  <span>{formatNumber(cart.quantity)}</span>
                  <span>{formatNumber(cart.price * cart.quantity)}</span>
                  <HStack pos="center">
                    <Button size="xs">Remove</Button>
                  </HStack>
                </div>
              </React.Fragment>
            ))}
          </VStack>
        </FormWrapper>
      </Container>
    </div>
  );
};

export default CartPage;
