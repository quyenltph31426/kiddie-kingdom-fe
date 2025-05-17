import { useCancelOrderMutation } from '@/api/order/queries';
import type { IOrder, OrderStatus, PaymentMethod, PaymentStatus } from '@/api/order/types';
import H4 from '@/components/text/H4';
import { Button } from '@/components/ui/button';
import { HStack, VStack } from '@/components/utilities';
import { cn, onMutateError } from '@/libs/common';
import { ROUTER } from '@/libs/router';
import { formatNumber } from '@/libs/utils';
import { format } from 'date-fns';
import { AlertCircle, CheckCircle, Clock, CreditCard, DollarSign, Package, RefreshCw, Truck, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface OrderItemProps {
  order: IOrder;
  onCancelSuccess?: () => void;
}

const OrderItem = ({ order, onCancelSuccess }: OrderItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

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

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* Order header */}
      <div className="border-gray-200 border-b p-4">
        <HStack className="justify-between">
          <HStack spacing={8}>
            <span className="text-gray-500 text-sm">Order #{order.orderCode}</span>
            <span className="text-gray-500 text-sm">{format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}</span>
          </HStack>

          <HStack spacing={8}>
            {/* Simplified status badge */}
            <span className={cn('flex items-center rounded-full px-3 py-1 font-medium text-xs', getSimplifiedStatusDisplay(order).color)}>
              {getSimplifiedStatusDisplay(order).icon}
              <span className="ml-1">{getSimplifiedStatusDisplay(order).text}</span>
            </span>

            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? 'Hide Details' : 'View Details'}
            </Button>
          </HStack>
        </HStack>
      </div>

      {/* Order summary (always visible) */}
      <div className="p-4">
        <HStack className="justify-between">
          <div>
            <H4 className="mb-1">Total: {formatNumber(order.totalAmount - order.discountAmount)}</H4>
            <HStack spacing={4} className="text-gray-500 text-sm">
              <span>{order.items.length} items</span>
              <span>•</span>
              <span className="flex items-center">
                {getPaymentMethodIcon(order.paymentMethod)}
                <span className="ml-1">{getPaymentMethodText(order.paymentMethod)}</span>
              </span>
            </HStack>
          </div>

          <HStack spacing={8}>
            <Link href={`${ROUTER.ORDERS}/${order._id}`}>
              <Button variant="outline" size="sm">
                View Order
              </Button>
            </Link>

            {order.shippingStatus === 'PENDING' && (
              <Button variant="destructive" size="sm" onClick={handleCancelOrder} disabled={isLoading}>
                Cancel Order
              </Button>
            )}
          </HStack>
        </HStack>
      </div>

      {/* Product preview (always visible) */}
      <div className="px-4 pb-4">
        <div className="flex flex-wrap gap-2">
          {order.items.map((item, index) => (
            <div key={index} className="relative h-16 w-16 overflow-hidden rounded-md border">
              <Image src={item.productImage || '/images/no-image.svg'} alt={item.productName} fill className="object-cover" sizes="64px" />
              {item.quantity > 1 && (
                <div className="absolute right-0 bottom-0 rounded-tl-md bg-black bg-opacity-70 px-1 text-white text-xs">
                  x{item.quantity}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Expanded details */}
      {isExpanded && (
        <div className="border-gray-200 border-t p-4">
          {/* Order ID and dates */}
          <div className="mb-4 rounded-md bg-gray-50 p-3">
            <VStack spacing={2} className="text-sm">
              <HStack className="w-full justify-between">
                <span className="text-gray-500">Order ID:</span>
                <span className="font-mono">{order._id}</span>
              </HStack>
              <HStack className="w-full justify-between">
                <span className="text-gray-500">Created:</span>
                <span>{format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm:ss')}</span>
              </HStack>
              <HStack className="w-full justify-between">
                <span className="text-gray-500">Updated:</span>
                <span>{format(new Date(order.updatedAt), 'dd/MM/yyyy HH:mm:ss')}</span>
              </HStack>
              <HStack className="w-full justify-between">
                <span className="text-gray-500">User ID:</span>
                <span className="font-mono">{order.userId}</span>
              </HStack>
              {order.voucherId && (
                <HStack className="w-full justify-between">
                  <span className="text-gray-500">Voucher:</span>
                  <span className="font-mono">{order.voucherId}</span>
                </HStack>
              )}
            </VStack>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Order items */}
            <div>
              <h5 className="mb-3 font-medium">Items</h5>
              <VStack spacing={12} className="max-h-80 overflow-y-auto">
                {order.items.map((item, index) => (
                  <div key={index} className="w-full">
                    <HStack className="w-full justify-between">
                      <HStack spacing={4} className="w-full">
                        {item.productImage && (
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
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
                            className="line-clamp-2 font-medium text-sm transition-colors hover:text-primary-600"
                          >
                            {item.productName}
                          </Link>

                          <VStack spacing={2} align="start" className="w-full">
                            <HStack className="text-gray-500 text-xs">
                              <span>Product ID:</span>
                              <span className="font-mono">{item.productId}</span>
                            </HStack>
                            <HStack className="text-gray-500 text-xs">
                              <span>Variant ID:</span>
                              <span className="font-mono">{item.variantId}</span>
                            </HStack>
                            <HStack className="text-gray-500 text-xs">
                              <span>Item ID:</span>
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
                            <span className="font-medium text-sm">{formatNumber(item.price * item.quantity)}</span>
                          </HStack>
                        </VStack>
                      </HStack>
                    </HStack>
                    {index < order.items.length - 1 && <div className="my-3 border-gray-100 border-b"></div>}
                  </div>
                ))}
              </VStack>
            </div>

            {/* Shipping and payment details */}
            <div>
              {/* Shipping status */}
              <h5 className="mb-2 font-medium">Shipping Status</h5>
              <div className="mb-4 flex items-center gap-2">
                <div
                  className={cn(
                    'rounded-full p-2',
                    order.shippingStatus === 'DELIVERED'
                      ? 'bg-green-100'
                      : order.shippingStatus === 'CANCELLED'
                        ? 'bg-red-100'
                        : 'bg-blue-100'
                  )}
                >
                  {getShippingStatusIcon(order.shippingStatus)}
                </div>
                <div>
                  <p className="font-medium text-sm">{getShippingStatusText(order.shippingStatus)}</p>
                  <p className="text-gray-500 text-xs">Last updated: {format(new Date(order.updatedAt), 'dd/MM/yyyy HH:mm')}</p>
                </div>
              </div>

              {/* Shipping address */}
              <h5 className="mb-2 font-medium">Shipping Address</h5>
              <div className="mb-4 rounded-md bg-gray-50 p-3">
                <VStack spacing={2} className="text-sm">
                  <p className="font-medium">{order.shippingAddress.fullName}</p>
                  <p>{order.shippingAddress.phone}</p>
                  <p>{order.shippingAddress.addressLine1}</p>
                  {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                  <p>
                    {order.shippingAddress.ward && `${order.shippingAddress.ward}, `}
                    {order.shippingAddress.district && `${order.shippingAddress.district}, `}
                    {order.shippingAddress.city} {order.shippingAddress.postalCode}
                  </p>
                </VStack>
              </div>

              {/* Payment method */}
              <h5 className="mb-2 font-medium">Payment Method</h5>
              <div className="mb-4 flex items-center gap-2">
                <div className="rounded-full bg-gray-100 p-2">{getPaymentMethodIcon(order.paymentMethod)}</div>
                <div>
                  <p className="font-medium text-sm">{getPaymentMethodText(order.paymentMethod)}</p>
                  {order.paymentMethod === 'ONLINE_PAYMENT' && order.paymentUrl && (
                    <a
                      href={order.paymentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 text-xs hover:underline"
                    >
                      Payment Link
                    </a>
                  )}
                </div>
              </div>

              {/* Payment status */}
              <h5 className="mb-2 font-medium">Payment Status</h5>
              <div className="mb-4 flex items-center gap-2">
                <div
                  className={cn(
                    'rounded-full p-2',
                    order.paymentStatus === 'COMPLETED'
                      ? 'bg-green-100'
                      : order.paymentStatus === 'FAILED'
                        ? 'bg-red-100'
                        : order.paymentStatus === 'REFUNDED'
                          ? 'bg-blue-100'
                          : 'bg-yellow-100'
                  )}
                >
                  {getPaymentStatusIcon(order.paymentStatus)}
                </div>
                <p className="font-medium text-sm">{getPaymentStatusText(order.paymentStatus)}</p>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-6 rounded-md bg-gray-50 p-4">
            <HStack className="mb-2 justify-between text-sm">
              <span>Subtotal:</span>
              <span>{formatNumber(order.totalAmount)}</span>
            </HStack>
            {order.discountAmount > 0 && (
              <HStack className="mb-2 justify-between text-sm">
                <span>Discount:</span>
                <span className="text-green-600">-{formatNumber(order.discountAmount)}</span>
              </HStack>
            )}
            <div className="my-2 border-gray-200 border-t"></div>
            <HStack className="justify-between font-medium text-base">
              <span>Total:</span>
              <span className="text-primary-600">{formatNumber(order.totalAmount - order.discountAmount)}</span>
            </HStack>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderItem;
