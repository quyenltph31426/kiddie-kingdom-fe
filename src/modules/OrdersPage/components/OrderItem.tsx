'use client';

import { useCancelOrderMutation } from '@/api/order/queries';
import type { IOrder, IOrderItem, OrderStatus, PaymentMethod, PaymentStatus } from '@/api/order/types';
import H4 from '@/components/text/H4';
import { Button } from '@/components/ui/button';
import { HStack, Show, VStack } from '@/components/utilities';
import { cn, onMutateError } from '@/libs/common';
import { ROUTER } from '@/libs/router';
import { formatNumber } from '@/libs/utils';
import { format } from 'date-fns';
import { AlertCircle, CheckCircle, Clock, CreditCard, DollarSign, Package, RefreshCw, Truck, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ReviewDialog from './ReviewDialog';

interface OrderItemProps {
  order: IOrder;
  onCancelSuccess?: () => void;
}

const OrderItem = ({ order, onCancelSuccess }: OrderItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedItemForReview, setSelectedItemForReview] = useState<IOrderItem | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  const { mutate: cancelOrder, isLoading } = useCancelOrderMutation({
    onSuccess: () => {
      toast.success('Order cancelled successfully');
      onCancelSuccess?.();
    },
    onError: onMutateError,
  });

  const handleCancelOrder = () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      cancelOrder(order._id);
    }
  };

  const openReviewDialog = (item: IOrderItem) => {
    setSelectedItemForReview(item);
    setIsReviewDialogOpen(true);
  };

  const getShippingStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'PROCESSING':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'SHIPPED':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'DELIVERED':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'CANCELLED':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getShippingStatusText = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING':
        return 'Pending';
      case 'PROCESSING':
        return 'Processing';
      case 'SHIPPED':
        return 'Shipped';
      case 'DELIVERED':
        return 'Delivered';
      case 'CANCELLED':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  const getShippingStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-800';
      case 'SHIPPED':
        return 'bg-blue-100 text-blue-800';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusIcon = (status: PaymentStatus) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'PENDING':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'FAILED':
        return <X className="h-5 w-5 text-red-500" />;
      case 'REFUNDED':
        return <RefreshCw className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPaymentStatusText = (status: PaymentStatus) => {
    switch (status) {
      case 'COMPLETED':
        return 'Completed';
      case 'PENDING':
        return 'Pending';
      case 'FAILED':
        return 'Failed';
      case 'REFUNDED':
        return 'Refunded';
      default:
        return 'Unknown';
    }
  };

  const getPaymentStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      case 'REFUNDED':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodIcon = (method: PaymentMethod) => {
    switch (method) {
      case 'CASH_ON_DELIVERY':
        return <DollarSign className="h-5 w-5 text-gray-500" />;
      case 'ONLINE_PAYMENT':
        return <CreditCard className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPaymentMethodText = (method: PaymentMethod) => {
    switch (method) {
      case 'CASH_ON_DELIVERY':
        return 'Cash On Delivery';
      case 'ONLINE_PAYMENT':
        return 'Online Payment';
      default:
        return 'Unknown';
    }
  };

  // Add a new function to determine if an order is fully completed
  const isOrderFullyCompleted = (order: IOrder): boolean => {
    return order.shippingStatus === 'DELIVERED' && order.paymentStatus === 'COMPLETED';
  };

  // Add a function to get the simplified status display
  const getSimplifiedStatusDisplay = (order: IOrder) => {
    if (isOrderFullyCompleted(order)) {
      return {
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        text: 'Completed',
        color: 'bg-green-100 text-green-800',
      };
    }

    if (order.shippingStatus === 'CANCELLED') {
      return {
        icon: <X className="h-5 w-5 text-red-500" />,
        text: 'Cancelled',
        color: 'bg-red-100 text-red-800',
      };
    }

    if (order.paymentStatus === 'FAILED') {
      return {
        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
        text: 'Payment Failed',
        color: 'bg-red-100 text-red-800',
      };
    }

    if (order.shippingStatus === 'PENDING') {
      return {
        icon: <Clock className="h-5 w-5 text-yellow-500" />,
        text: 'Pending',
        color: 'bg-yellow-100 text-yellow-800',
      };
    }

    if (order.shippingStatus === 'PROCESSING') {
      return {
        icon: <Package className="h-5 w-5 text-blue-500" />,
        text: 'Processing',
        color: 'bg-blue-100 text-blue-800',
      };
    }

    if (order.shippingStatus === 'SHIPPED') {
      return {
        icon: <Truck className="h-5 w-5 text-blue-500" />,
        text: 'Shipping',
        color: 'bg-blue-100 text-blue-800',
      };
    }

    return {
      icon: <AlertCircle className="h-5 w-5 text-gray-500" />,
      text: 'Processing',
      color: 'bg-gray-100 text-gray-800',
    };
  };

  const canReview = order.shippingStatus === 'DELIVERED' && order.paymentStatus === 'COMPLETED';

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Order header - with gradient background for better visual hierarchy */}
      <div className="border-gray-200 border-b bg-gradient-to-r from-gray-50 to-white p-4">
        <HStack className="justify-between">
          <HStack spacing={8}>
            <span className="font-medium text-gray-700 text-sm">Order #{order.orderCode}</span>
            <span className="text-gray-500 text-sm">{format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}</span>
          </HStack>

          <HStack spacing={8}>
            {/* Simplified status badge with improved styling */}
            <span
              className={cn(
                'flex items-center rounded-full px-3 py-1 font-medium text-xs shadow-sm',
                getSimplifiedStatusDisplay(order).color
              )}
            >
              {getSimplifiedStatusDisplay(order).icon}
              <span className="ml-1">{getSimplifiedStatusDisplay(order).text}</span>
            </span>

            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="hover:bg-gray-100">
              {isExpanded ? 'Hide Details' : 'View Details'}
            </Button>
          </HStack>
        </HStack>
      </div>

      {/* Order summary (always visible) - with improved spacing and visual hierarchy */}
      <div className="p-4">
        <HStack className="justify-between">
          <div>
            <H4 className="mb-1 text-primary-700">Total: {formatNumber(order.totalAmount - order.discountAmount)}</H4>
            <HStack spacing={4} className="text-gray-500 text-sm">
              <span className="font-medium">{order.items.length} items</span>
              <span>•</span>
              <span className="flex items-center">
                {getPaymentMethodIcon(order.paymentMethod)}
                <span className="ml-1">{getPaymentMethodText(order.paymentMethod)}</span>
              </span>
            </HStack>
          </div>

          <VStack spacing={2} align="end">
            <Link href={`${ROUTER.ORDERS}/${order._id}`}>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-primary-200 text-primary-700 hover:bg-primary-50 hover:text-primary-800"
              >
                View Order
              </Button>
            </Link>

            {order.shippingStatus === 'PENDING' && (
              <Button variant="destructive" size="sm" onClick={handleCancelOrder} disabled={isLoading}>
                {isLoading ? 'Cancelling...' : 'Cancel Order'}
              </Button>
            )}
          </VStack>
        </HStack>
      </div>

      {/* Product preview with improved layout and hover effects */}
      <VStack spacing={4} className="px-4 pb-4">
        {order.items.map((item, index) => {
          // && !item?.isReviewed;

          return (
            <div className="flex items-center" key={index}>
              <HStack className="flex-1">
                <div
                  className="group relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-gray-200 transition-all hover:border-primary-300 hover:shadow-md"
                  onClick={() => canReview && openReviewDialog(item)}
                >
                  <Image
                    src={item.productImage || '/images/no-image.svg'}
                    alt={item.productName}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                    sizes="64px"
                  />
                  {item.quantity > 1 && (
                    <div className="absolute right-0 bottom-0 rounded-tl-md bg-black bg-opacity-70 px-1 text-white text-xs">
                      x{item.quantity}
                    </div>
                  )}
                </div>

                <VStack>
                  <span className="line-clamp-1 font-medium text-sm">{item.productName}</span>
                  <span className="text-gray-500 text-xs">Qty: {item.quantity}</span>
                </VStack>
              </HStack>

              <VStack>
                <Show when={canReview}>
                  {item.isReviewed ? (
                    <ReviewDialog
                      productId={item.productId}
                      productName={item.productName}
                      productImage={item.productImage}
                      orderId={order._id}
                    />
                  ) : (
                    <Button size="xs" disabled>
                      Reviewed
                    </Button>
                  )}
                </Show>
              </VStack>
            </div>
          );
        })}
      </VStack>

      {/* Expanded details with improved sections and visual hierarchy */}
      {isExpanded && (
        <div className="border-gray-200 border-t bg-gray-50 p-4">
          {/* Order ID and dates with card styling */}
          <div className="mb-4 rounded-md bg-white p-3 shadow-sm">
            <VStack spacing={2} className="text-sm">
              <HStack className="w-full justify-between">
                <span className="font-medium text-gray-600">Order ID:</span>
                <span className="font-mono text-gray-800">{order._id}</span>
              </HStack>
              <HStack className="w-full justify-between">
                <span className="font-medium text-gray-600">Created:</span>
                <span className="text-gray-800">{format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm:ss')}</span>
              </HStack>
              <HStack className="w-full justify-between">
                <span className="font-medium text-gray-600">Updated:</span>
                <span className="text-gray-800">{format(new Date(order.updatedAt), 'dd/MM/yyyy HH:mm:ss')}</span>
              </HStack>
              <HStack className="w-full justify-between">
                <span className="font-medium text-gray-600">User ID:</span>
                <span className="font-mono text-gray-800">{order.userId}</span>
              </HStack>
              {order.voucherId && (
                <HStack className="w-full justify-between">
                  <span className="font-medium text-gray-600">Voucher:</span>
                  <span className="font-mono text-gray-800">{order.voucherId}</span>
                </HStack>
              )}
            </VStack>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Order items with improved card styling */}
            <div>
              <h5 className="mb-3 font-medium text-gray-700">Items</h5>
              <div className="rounded-md bg-white p-3 shadow-sm">
                <VStack spacing={12} className="max-h-80 overflow-y-auto">
                  {order.items.map((item, index) => (
                    <div key={index} className="w-full">
                      <HStack className="w-full justify-between">
                        <HStack spacing={4} className="w-full">
                          {item.productImage && (
                            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <Image
                                src={item.productImage}
                                alt={item.productName}
                                width={80}
                                height={80}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                          <VStack align="start" spacing={2} className="flex-1">
                            <Link
                              href={`${ROUTER.PRODUCTS}/${item.productId}`}
                              className="line-clamp-2 font-medium text-primary-600 text-sm transition-colors hover:text-primary-700 hover:underline"
                            >
                              {item.productName}
                            </Link>

                            <VStack spacing={2} align="start" className="w-full">
                              <HStack className="text-gray-500 text-xs">
                                <span className="font-medium">Product ID:</span>
                                <span className="font-mono">{item.productId}</span>
                              </HStack>
                              <HStack className="text-gray-500 text-xs">
                                <span className="font-medium">Variant ID:</span>
                                <span className="font-mono">{item.variantId}</span>
                              </HStack>
                              <HStack className="text-gray-500 text-xs">
                                <span className="font-medium">Item ID:</span>
                                <span className="font-mono">{item._id}</span>
                              </HStack>
                            </VStack>

                            {item.attributes && Object.keys(item.attributes).length > 0 && (
                              <div className="mt-1 flex flex-wrap gap-1">
                                {Object.entries(item.attributes).map(([key, value]) => (
                                  <span key={key} className="rounded bg-gray-100 px-2 py-1 text-xs">
                                    {key}: {value}
                                  </span>
                                ))}
                              </div>
                            )}

                            <HStack className="mt-1 w-full justify-between">
                              <span className="text-gray-500 text-xs">
                                Qty: {item.quantity} x {formatNumber(item.price)}
                              </span>
                              <span className="font-medium text-primary-700 text-sm">{formatNumber(item.price * item.quantity)}</span>
                            </HStack>

                            {/* Review button for completed orders */}
                          </VStack>
                        </HStack>
                      </HStack>
                      {index < order.items.length - 1 && <div className="my-3 border-gray-100 border-b"></div>}
                    </div>
                  ))}
                </VStack>
              </div>
            </div>

            {/* Order details with improved card styling */}
            <div>
              <h5 className="mb-3 font-medium text-gray-700">Order Details</h5>
              <div className="space-y-4">
                {/* Payment information */}
                <div className="rounded-md bg-white p-3 shadow-sm">
                  <h6 className="mb-2 font-medium text-gray-700">Payment Information</h6>
                  <VStack spacing={2} className="text-sm">
                    <HStack className="w-full justify-between">
                      <span className="text-gray-600">Method:</span>
                      <span className="flex items-center font-medium">
                        {getPaymentMethodIcon(order.paymentMethod)}
                        <span className="ml-1">{getPaymentMethodText(order.paymentMethod)}</span>
                      </span>
                    </HStack>
                    <HStack className="w-full justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span
                        className={cn('flex items-center rounded-full px-2 py-0.5 text-xs', getPaymentStatusColor(order.paymentStatus))}
                      >
                        {getPaymentStatusIcon(order.paymentStatus)}
                        <span className="ml-1">{getPaymentStatusText(order.paymentStatus)}</span>
                      </span>
                    </HStack>
                  </VStack>
                </div>

                {/* Shipping information */}
                <div className="rounded-md bg-white p-3 shadow-sm">
                  <h6 className="mb-2 font-medium text-gray-700">Shipping Information</h6>
                  <VStack spacing={2} className="text-sm">
                    <HStack className="w-full justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span
                        className={cn('flex items-center rounded-full px-2 py-0.5 text-xs', getShippingStatusColor(order.shippingStatus))}
                      >
                        {getShippingStatusIcon(order.shippingStatus)}
                        <span className="ml-1">{getShippingStatusText(order.shippingStatus)}</span>
                      </span>
                    </HStack>
                    <HStack className="w-full justify-between">
                      <span className="text-gray-600">Address:</span>
                      <span className="text-right text-gray-800">{order.shippingAddress?.addressLine1}</span>
                    </HStack>
                    <HStack className="w-full justify-between">
                      <span className="text-gray-600">City:</span>
                      <span className="text-gray-800">{order.shippingAddress?.city}</span>
                    </HStack>
                    <HStack className="w-full justify-between">
                      <span className="text-gray-600">District:</span>
                      <span className="text-gray-800">{order.shippingAddress?.district}</span>
                    </HStack>
                    <HStack className="w-full justify-between">
                      <span className="text-gray-600">Ward:</span>
                      <span className="text-gray-800">{order.shippingAddress?.ward}</span>
                    </HStack>
                    <HStack className="w-full justify-between">
                      <span className="text-gray-600">Postal Code:</span>
                      <span className="text-gray-800">{order.shippingAddress?.postalCode}</span>
                    </HStack>
                  </VStack>
                </div>

                {/* Price breakdown */}
                <div className="rounded-md bg-white p-3 shadow-sm">
                  <h6 className="mb-2 font-medium text-gray-700">Price Breakdown</h6>
                  <VStack spacing={2} className="text-sm">
                    <HStack className="w-full justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="text-gray-800">{formatNumber(order.totalAmount)}</span>
                    </HStack>

                    {order.discountAmount > 0 && (
                      <HStack className="w-full justify-between">
                        <span className="text-gray-600">Discount:</span>
                        <span className="text-green-600">-{formatNumber(order.discountAmount)}</span>
                      </HStack>
                    )}
                    <div className="my-1 border-gray-200 border-t"></div>
                    <HStack className="w-full justify-between">
                      <span className="font-medium text-gray-700">Total:</span>
                      <span className="font-medium text-primary-700">{formatNumber(order.totalAmount)}</span>
                    </HStack>
                  </VStack>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-2">
                  {order.shippingStatus === 'PENDING' && (
                    <Button variant="destructive" size="sm" onClick={handleCancelOrder} disabled={isLoading} className="w-full">
                      {isLoading ? 'Cancelling...' : 'Cancel Order'}
                    </Button>
                  )}
                  <Link href={`${ROUTER.ORDERS}/${order._id}`} className="w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-primary-200 text-primary-700 hover:bg-primary-50 hover:text-primary-800"
                    >
                      View Order Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderItem;
