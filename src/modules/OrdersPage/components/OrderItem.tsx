import { useCancelOrderMutation } from '@/api/order/queries';
import type { IOrder } from '@/api/order/types';
import { Icons } from '@/assets/icons';
import H4 from '@/components/text/H4';
import { Button } from '@/components/ui/button';
import { HStack, VStack } from '@/components/utilities';
import { cn, onMutateError } from '@/libs/common';
import { ROUTER } from '@/libs/router';
import { formatNumber } from '@/libs/utils';
import { format } from 'date-fns';
import { AlertCircle, Check, Package, Truck } from 'lucide-react';
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

  const getStatusIcon = () => {
    switch (order.status) {
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'processing':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'delivered':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <Icons.X className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = () => {
    switch (order.status) {
      case 'pending':
        return 'Pending';
      case 'processing':
        return 'Processing';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = () => {
    switch (order.status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* Order header */}
      <div className="border-gray-200 border-b p-4">
        <HStack className="justify-between">
          <HStack spacing={8}>
            <span className="text-gray-500 text-sm">Order #{order.orderNumber}</span>
            <span className="text-gray-500 text-sm">{format(new Date(order.createdAt), 'dd/MM/yyyy')}</span>
          </HStack>

          <HStack spacing={8}>
            <span className={cn('rounded-full px-3 py-1 font-medium text-xs', getStatusColor())}>
              {getStatusIcon()}
              <span className="ml-1">{getStatusText()}</span>
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
            <H4 className="mb-1">Total: {formatNumber(order.total)}</H4>
            <p className="text-gray-500 text-sm">{order.items.length} items</p>
          </div>

          <HStack spacing={8}>
            <Link href={`${ROUTER.ORDERS}/${order._id}`}>
              <Button variant="outline" size="sm">
                View Order
              </Button>
            </Link>

            {order.status === 'pending' && (
              <Button variant="destructive" size="sm" onClick={handleCancelOrder} disabled={isLoading}>
                Cancel Order
              </Button>
            )}
          </HStack>
        </HStack>
      </div>

      {/* Expanded details */}
      {isExpanded && (
        <div className="border-gray-200 border-t p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Order items */}
            <div>
              <h5 className="mb-2 font-medium">Items</h5>
              <VStack spacing={8} className="max-h-60 overflow-y-auto">
                {order.items.map((item, index) => (
                  <HStack key={index} className="justify-between">
                    <span className="text-sm">
                      {item.quantity} x {item.name}
                    </span>
                    <span className="font-medium text-sm">{formatNumber(item.price * item.quantity)}</span>
                  </HStack>
                ))}
              </VStack>
            </div>

            {/* Shipping details */}
            <div>
              <h5 className="mb-2 font-medium">Shipping Address</h5>
              <VStack spacing={4} className="text-sm">
                <p>{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.phoneNumber}</p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </VStack>

              <h5 className="mt-4 mb-2 font-medium">Payment Method</h5>
              <p className="text-sm capitalize">{order.paymentMethod.type.replace('_', ' ')}</p>
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-4 border-gray-200 border-t pt-4">
            <HStack className="justify-between text-sm">
              <span>Subtotal:</span>
              <span>{formatNumber(order.subtotal)}</span>
            </HStack>
            <HStack className="justify-between text-sm">
              <span>Shipping Fee:</span>
              <span>{formatNumber(order.shippingFee)}</span>
            </HStack>
            {order.discount > 0 && (
              <HStack className="justify-between text-sm">
                <span>Discount:</span>
                <span>-{formatNumber(order.discount)}</span>
              </HStack>
            )}
            <HStack className="justify-between font-medium">
              <span>Total:</span>
              <span>{formatNumber(order.total)}</span>
            </HStack>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderItem;
