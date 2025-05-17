'use client';

import { useCancelOrderMutation, useOrderByIdQuery } from '@/api/order/queries';
import Breadcrumb from '@/components/Breadcrumb';
import H2 from '@/components/text/H2';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { HStack, Show, VStack } from '@/components/utilities';
import Container from '@/components/wrapper/Container';
import { cn, onMutateError } from '@/libs/common';
import { ROUTER } from '@/libs/router';
import { formatNumber } from '@/libs/utils';
import { format } from 'date-fns';
import { AlertCircle, ArrowLeft, CheckCircle, Loader2, Package, Truck, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const OrderDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const {
    data: order,
    isFetching,
    error,
    refetch,
  } = useOrderByIdQuery({
    variables: orderId,
    enabled: Boolean(orderId),
    onError: onMutateError,
  });

  const { mutate: cancelOrder, isLoading: isCancelling } = useCancelOrderMutation({
    onSuccess: () => {
      toast.success('Order cancelled successfully');
      refetch();
    },
    onError: onMutateError,
  });

  const handleCancelOrder = () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      cancelOrder(orderId);
    }
  };

  const getStatusBadge = () => {
    if (!order) return null;

    const statusConfig = {
      PENDING: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: <AlertCircle className="h-5 w-5" />,
        text: 'Pending',
      },
      PROCESSING: {
        color: 'bg-blue-100 text-blue-800',
        icon: <Package className="h-5 w-5" />,
        text: 'Processing',
      },
      SHIPPING: {
        color: 'bg-blue-100 text-blue-800',
        icon: <Truck className="h-5 w-5" />,
        text: 'Shipping',
      },
      COMPLETED: {
        color: 'bg-green-100 text-green-800',
        icon: <CheckCircle className="h-5 w-5" />,
        text: 'Completed',
      },
      CANCELLED: {
        color: 'bg-red-100 text-red-800',
        icon: <X className="h-5 w-5" />,
        text: 'Cancelled',
      },
    };

    const config = statusConfig[order.status] || statusConfig.PENDING;

    return (
      <span className={cn('flex items-center gap-1.5 rounded-full px-3 py-1 font-medium text-sm', config.color)}>
        {config.icon}
        {config.text}
      </span>
    );
  };

  if (error) {
    return (
      <Container className="py-16">
        <div className="text-center">
          <h2 className="font-semibold text-gray-900 text-xl">Order not found</h2>
          <p className="mt-2 text-gray-600">The order you're looking for doesn't exist or you don't have permission to view it.</p>
          <Link href={ROUTER.ORDERS}>
            <Button className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <div>
      <Breadcrumb
        breadcrumbs={[
          { name: 'Home', path: ROUTER.HOME },
          { name: 'My Orders', path: ROUTER.ORDERS },
          { name: order ? `Order #${order.orderNumber}` : 'Order Details' },
        ]}
      />

      <Container className="py-8">
        <div className="mb-6 flex items-center justify-between">
          <Link href={ROUTER.ORDERS}>
            <Button variant="ghost" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Orders
            </Button>
          </Link>
          {order?.status === 'PENDING' && (
            <Button variant="destructive" onClick={handleCancelOrder} disabled={isCancelling}>
              {isCancelling && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Cancel Order
            </Button>
          )}
        </div>

        <Show when={isFetching}>
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </Show>

        <Show when={!isFetching && !!order}>
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            {/* Order header */}
            <div className="border-gray-200 border-b p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <H2 className="mb-1">Order #{order?.orderNumber}</H2>
                  <p className="text-gray-500 text-sm">Placed on {format(new Date(order?.createdAt || ''), 'dd/MM/yyyy')}</p>
                </div>
                <div className="flex items-center gap-4">{getStatusBadge()}</div>
              </div>
            </div>

            {/* Order details */}
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Order items */}
                <div className="lg:col-span-2">
                  <h3 className="mb-4 font-medium text-lg">Order Items</h3>
                  <div className="rounded-lg border border-gray-200">
                    {order?.items.map((item, index) => (
                      <div
                        key={index}
                        className={cn('flex items-start gap-4 p-4', index !== order.items.length - 1 && 'border-gray-200 border-b')}
                      >
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          {item.image ? (
                            <Image src={item.image} alt={item.productName} fill className="object-cover object-center" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gray-100">
                              <Package className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col">
                          <h4 className="font-medium text-gray-900 text-sm">{item.productName}</h4>
                          {item.variantId && <p className="mt-1 text-gray-500 text-xs">Variant: {item.variantId}</p>}
                          <div className="mt-auto flex items-end justify-between">
                            <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                            <p className="font-medium text-gray-900 text-sm">{formatNumber(item.price * item.quantity)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order summary */}
                  <div className="mt-6 rounded-lg border border-gray-200 p-4">
                    <h3 className="mb-4 font-medium text-lg">Order Summary</h3>
                    <div className="space-y-2">
                      <HStack className="justify-between">
                        <span className="text-gray-600 text-sm">Subtotal</span>
                        <span className="font-medium text-sm">{formatNumber(order?.totalAmount || 0)}</span>
                      </HStack>
                      {(order?.discountAmount || 0) > 0 && (
                        <HStack className="justify-between">
                          <span className="text-gray-600 text-sm">Discount</span>
                          <span className="font-medium text-red-600 text-sm">-{formatNumber(order?.discountAmount || 0)}</span>
                        </HStack>
                      )}
                      <Separator className="my-2" />
                      <HStack className="justify-between">
                        <span className="font-medium">Total</span>
                        <span className="font-medium">{formatNumber((order?.totalAmount || 0) - (order?.discountAmount || 0))}</span>
                      </HStack>
                    </div>
                  </div>
                </div>

                {/* Shipping and payment info */}
                <div>
                  <div className="rounded-lg border border-gray-200 p-4">
                    <h3 className="mb-4 font-medium text-lg">Shipping Information</h3>
                    <VStack spacing={8} align="start">
                      <div>
                        <p className="font-medium">{order?.shippingAddress.fullName}</p>
                        <p className="text-gray-600 text-sm">{order?.shippingAddress.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm">{order?.shippingAddress.addressLine1}</p>
                        {order?.shippingAddress.addressLine2 && <p className="text-sm">{order?.shippingAddress.addressLine2}</p>}
                        <p className="text-sm">
                          {order?.shippingAddress.city}, {order?.shippingAddress.district} {order?.shippingAddress.postalCode}
                        </p>
                        {order?.shippingAddress.ward && <p className="text-sm">{order?.shippingAddress.ward}</p>}
                      </div>
                    </VStack>
                  </div>

                  <div className="mt-6 rounded-lg border border-gray-200 p-4">
                    <h3 className="mb-4 font-medium text-lg">Payment Method</h3>
                    <p className="text-gray-700 capitalize">
                      {order?.paymentMethod === 'CASH_ON_DELIVERY' ? 'Cash On Delivery' : 'Online Payment'}
                    </p>

                    {order?.paidAt && (
                      <div className="mt-2 p-2 bg-green-50 rounded-md">
                        <p className="text-sm text-green-600 font-medium">Paid on {format(new Date(order.paidAt), 'dd/MM/yyyy HH:mm')}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Show>
      </Container>
    </div>
  );
};

export default OrderDetailPage;
