'use client';

import { useVouchersQuery } from '@/api/voucher/queries';
import H2 from '@/components/text/H2';
import { Button } from '@/components/ui/button';
import { Show } from '@/components/utilities';
import { ROUTER } from '@/libs/router';
import { ArrowRight, Ticket } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import VoucherCard from '@/modules/VouchersPage/components/VoucherCard';

const AvailableVouchers = () => {
  const { data, isFetching } = useVouchersQuery({
    variables: { limit: 4 },
  });

  return (
    <section className="mt-10">
      <div className="mb-8 flex items-center justify-between">
        <H2 className="text-primary-500">Available Vouchers</H2>
        <Link href={ROUTER.VOUCHERS}>
          <Button variant="ghost" className="group">
            View All
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      <Show when={isFetching}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-48 animate-pulse rounded-lg bg-gray-200"></div>
          ))}
        </div>
      </Show>

      <Show when={!isFetching && (!data || data?.length === 0)}>
        <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 py-12">
          <Ticket className="h-12 w-12 text-gray-400" />
          <p className="mt-4 text-center text-gray-500">No vouchers available at the moment</p>
          <p className="text-center text-gray-500">Check back later for special offers!</p>
        </div>
      </Show>

      <Show when={!isFetching && data && data.length > 0}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {data?.slice(0, 4).map((voucher) => (
            <VoucherCard key={voucher._id} voucher={voucher} />
          ))}
        </div>
      </Show>
    </section>
  );
};

export default AvailableVouchers;
