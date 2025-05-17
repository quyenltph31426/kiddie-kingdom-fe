'use client';

import { useOrdersQuery } from '@/api/order/queries';
import type { OrderStatus } from '@/api/order/types';
import Breadcrumb from '@/components/Breadcrumb';
import NoDataAvailable from '@/components/NoDataAvailable';
import Tabs from '@/components/tabs/Tabs';
import H2 from '@/components/text/H2';
import { Button } from '@/components/ui/button';
import { TablePagination } from '@/components/ui/table';
import { Show, VStack } from '@/components/utilities';
import Container from '@/components/wrapper/Container';
import { onMutateError } from '@/libs/common';
import { ROUTER } from '@/libs/router';
import { CheckCircle, Package, ShoppingBag, Truck, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import OrderItem from './components/OrderItem';

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  // Convert tab to API status filter
  const getStatusFilter = (): OrderStatus | undefined => {
    switch (activeTab) {
      case 'pending':
        return 'PENDING';
      case 'processing':
        return 'PROCESSING';
      case 'shipping':
        return 'SHIPPING';
      case 'completed':
        return 'COMPLETED';
      case 'cancelled':
        return 'CANCELLED';
      default:
        return undefined;
    }
  };

  const { data, isFetching, refetch } = useOrdersQuery({
    variables: {
      page,
      limit,
      status: getStatusFilter(),
    },
    onError: onMutateError,
  });

  // Reset page when changing tabs
  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  const handleTabChange = (value: string | number) => {
    setActiveTab(value.toString());
  };

  const tabOptions = [
    { label: 'All Orders', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Processing', value: 'processing' },
    { label: 'Shipping', value: 'shipping' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' },
  ];

  return (
    <div>
      <Breadcrumb breadcrumbs={[{ name: 'Home', path: ROUTER.HOME }, { name: 'My Orders' }]} />

      <Container className="py-8">
        <H2 className="mb-6">My Orders</H2>

        <div className="mb-6">
          <Tabs data={tabOptions} onChange={handleTabChange} value={activeTab} layoutId="orders-tabs" />
        </div>

        <Show when={isFetching}>
          <VStack spacing={16} className="mt-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-32 w-full animate-pulse rounded-lg bg-gray-200"></div>
            ))}
          </VStack>
        </Show>

        <Show when={!isFetching && (!data?.items || data.items.length === 0)}>
          <NoDataAvailable
            title="No orders found"
            description={`You don't have any ${activeTab !== 'all' ? activeTab : ''} orders yet.`}
            icon={getEmptyStateIcon(activeTab)}
            action={
              <Link href={ROUTER.PRODUCTS}>
                <Button>Continue Shopping</Button>
              </Link>
            }
          />
        </Show>

        <Show when={!isFetching && data && data.items.length > 0}>
          <VStack spacing={16} className="mt-4">
            {data?.items.map((order) => (
              <OrderItem key={order._id} order={order} onCancelSuccess={refetch} />
            ))}
          </VStack>

          <div className="mt-8 flex justify-center">
            <TablePagination pagination={data?.meta} loading={isFetching} onPageChange={setPage} onPageSizeChange={setLimit} />
          </div>
        </Show>
      </Container>
    </div>
  );
};

// Helper function to get appropriate icon for empty state
function getEmptyStateIcon(tab: string) {
  switch (tab) {
    case 'pending':
      return <ShoppingBag className="h-16 w-16 text-yellow-500" />;
    case 'processing':
      return <Package className="h-16 w-16 text-blue-500" />;
    case 'shipping':
      return <Truck className="h-16 w-16 text-blue-500" />;
    case 'completed':
      return <CheckCircle className="h-16 w-16 text-green-500" />;
    case 'cancelled':
      return <X className="h-16 w-16 text-red-500" />;
    default:
      return <ShoppingBag className="h-16 w-16 text-gray-400" />;
  }
}

export default OrdersPage;

