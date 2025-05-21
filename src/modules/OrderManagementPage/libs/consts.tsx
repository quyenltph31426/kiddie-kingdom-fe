import {
  type IOrderQuery,
  OrderStatus,
  PaymentStatus,
  type PaymentStatusType,
  ShippingStatus,
  type ShippingStatusType,
} from '@/api/order/types';
import { Badge } from '@/components/ui/badge';
import type { ITableColumn } from '@/components/ui/table';
import { HStack } from '@/components/utilities';
import { formatCurrency } from '@/libs/common';
import { format } from 'date-fns';
import OrderDetailDialog from '../components/OrderDetailDialog';
import UpdatePaymentStatus from '../components/UpdatePaymentStatus';
import UpdateShippingStatus from '../components/UpdateShippingStatus';

// Status transition maps
export const getValidShippingStatusTransitions = (currentStatus: ShippingStatusType): ShippingStatusType[] => {
  const transitionMap: Record<ShippingStatusType, ShippingStatusType[]> = {
    PENDING: ['PROCESSING', 'CANCELED'],
    PROCESSING: ['SHIPPED', 'CANCELED'],
    SHIPPED: ['DELIVERED', 'CANCELED'],
    DELIVERED: [],
    CANCELED: [],
  };

  return transitionMap[currentStatus] || [];
};

export const getValidPaymentStatusTransitions = (currentStatus: PaymentStatusType): PaymentStatusType[] => {
  const transitionMap: Record<PaymentStatusType, PaymentStatusType[]> = {
    PENDING: ['COMPLETED', 'FAILED'],
    COMPLETED: ['REFUNDED'],
    FAILED: ['PENDING'],
    REFUNDED: [],
  };

  return transitionMap[currentStatus] || [];
};

export const defaultQuery: Partial<IOrderQuery> = {
  page: 1,
  limit: 10,
  startDate: format(new Date(new Date().setDate(new Date().getDate() - 30)), 'yyyy-MM-dd'),
  endDate: format(new Date(new Date().setHours(23, 59, 0, 0)), 'yyyy-MM-dd HH:mm:ss'),
};

export const ORDER_STATUS_OPTIONS = [
  { value: OrderStatus.TO_PAY, label: 'To Pay', color: 'bg-yellow-100 text-yellow-800' },
  { value: OrderStatus.COMPLETED, label: 'Completed', color: 'bg-green-100 text-green-800' },
  { value: OrderStatus.CANCELED, label: 'Canceled', color: 'bg-red-100 text-red-800' },
  { value: OrderStatus.REFUND, label: 'Refund', color: 'bg-gray-100 text-gray-800' },
  { value: OrderStatus.EXPIRED, label: 'Expired', color: 'bg-orange-100 text-orange-800' },
];

export const SHIPPING_STATUS_OPTIONS = [
  { value: ShippingStatus.PENDING, label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: ShippingStatus.PROCESSING, label: 'Processing', color: 'bg-blue-100 text-blue-800' },
  { value: ShippingStatus.SHIPPED, label: 'Shipped', color: 'bg-indigo-100 text-indigo-800' },
  { value: ShippingStatus.DELIVERED, label: 'Delivered', color: 'bg-green-100 text-green-800' },
  { value: ShippingStatus.CANCELED, label: 'Canceled', color: 'bg-red-100 text-red-800' },
];

export const PAYMENT_STATUS_OPTIONS = [
  { value: PaymentStatus.PENDING, label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: PaymentStatus.COMPLETED, label: 'Completed', color: 'bg-green-100 text-green-800' },
  { value: PaymentStatus.FAILED, label: 'Failed', color: 'bg-red-100 text-red-800' },
  { value: PaymentStatus.REFUNDED, label: 'Refunded', color: 'bg-gray-100 text-gray-800' },
];

export const PAYMENT_METHOD_LABELS = {
  ONLINE_PAYMENT: 'Online Payment',
  CASH_ON_DELIVERY: 'Cash on Delivery',
};

export const getStatusBadge = (status: string) => {
  const statusOption = ORDER_STATUS_OPTIONS.find((option) => option.value === status);
  return <Badge className={statusOption?.color || 'bg-gray-100 text-gray-800'}>{statusOption?.label || status}</Badge>;
};

export const getShippingStatusBadge = (status: string) => {
  const statusOption = SHIPPING_STATUS_OPTIONS.find((option) => option.value === status);
  return <Badge className={statusOption?.color || 'bg-gray-100 text-gray-800'}>{statusOption?.label || status}</Badge>;
};

export const getPaymentStatusBadge = (status: string) => {
  const statusOption = PAYMENT_STATUS_OPTIONS.find((option) => option.value === status);
  return <Badge className={statusOption?.color || 'bg-gray-100 text-gray-800'}>{statusOption?.label || status}</Badge>;
};

export const formatDateTime = (dateString?: string) => {
  if (!dateString) return '-';
  return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
};

export const COLUMNS = (refetch: any): ITableColumn[] => [
  {
    title: 'Order Number',
    key: 'orderCode',
    align: 'left',
    className: 'w-[150px]',
  },
  {
    title: 'Customer',
    key: 'userId',
    align: 'left',
    getCell: ({ row }) => (
      <div className="px-2 py-1">
        <div className="font-medium">{row.userId?.username}</div>
        <div className="text-gray-500 text-xs">{row.userId?.email}</div>
      </div>
    ),
  },
  {
    title: 'Items',
    key: 'items',
    align: 'center',
    getCell: ({ row }) => <div className="px-2 py-1 text-center">{row.items?.length || 0}</div>,
  },
  {
    title: 'Total Amount',
    key: 'totalAmount',
    align: 'right',
    getCell: ({ row }) => <div className="px-2 py-1 text-right font-medium">{formatCurrency(row.totalAmount)}</div>,
  },
  {
    title: 'Discount',
    key: 'discountAmount',
    align: 'right',
    getCell: ({ row }) => (
      <div className="px-2 py-1 text-right">
        {row.discountAmount > 0 ? (
          <span className="font-medium text-green-600">-{formatCurrency(row.discountAmount)}</span>
        ) : (
          <span className="text-gray-500">-</span>
        )}
      </div>
    ),
  },
  {
    title: 'Voucher',
    key: 'voucherId',
    align: 'center',
    getCell: ({ row }) => (
      <div className="px-2 py-1 text-center">
        {row.voucherId ? (
          <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-700">
            {typeof row.voucherId === 'object' ? row.voucherId.code : row.voucherId}
          </Badge>
        ) : (
          <span className="text-gray-500">-</span>
        )}
      </div>
    ),
  },
  {
    title: 'Payment Method',
    key: 'paymentMethod',
    align: 'center',
    getCell: ({ row }) => (
      <div className="px-2 py-1 text-center">{(PAYMENT_METHOD_LABELS as any)[row.paymentMethod] || row.paymentMethod}</div>
    ),
  },
  {
    title: 'Payment Status',
    key: 'paymentStatus',
    align: 'center',
    getCell: ({ row }) => (
      <HStack pos="center" noWrap>
        {getPaymentStatusBadge(row.paymentStatus)}
        {row.paymentMethod === 'CASH_ON_DELIVERY' && row.paymentStatus !== PaymentStatus.COMPLETED && (
          <UpdatePaymentStatus orderId={row._id} currentStatus={row.paymentStatus} refetch={refetch} />
        )}
      </HStack>
    ),
  },
  {
    title: 'Paid At',
    key: 'paidAt',
    align: 'center',
    getCell: ({ row }) => <div className="px-2 py-1 text-center">{formatDateTime(row.paidAt)}</div>,
  },
  {
    title: 'Shipping Status',
    key: 'shippingStatus',
    align: 'center',
    getCell: ({ row }) => (
      <HStack pos="center" noWrap>
        {getShippingStatusBadge(row.shippingStatus)}
        <UpdateShippingStatus orderId={row._id} currentStatus={row.shippingStatus} refetch={refetch} />
      </HStack>
    ),
  },
  {
    title: 'Shipped At',
    key: 'shippedAt',
    align: 'center',
    getCell: ({ row }) => <div className="px-2 py-1 text-center">{formatDateTime(row.shippedAt)}</div>,
  },
  {
    title: 'Delivered At',
    key: 'deliveredAt',
    align: 'center',
    getCell: ({ row }) => <div className="px-2 py-1 text-center">{formatDateTime(row.deliveredAt)}</div>,
  },
  {
    title: 'Ngày tạo',
    key: 'createdAt',
    align: 'center',
    getCell: ({ row }) => <div className="px-2 py-1 text-center">{formatDateTime(row.createdAt)}</div>,
  },
  {
    title: 'Actions',
    key: 'actions',
    align: 'center',
    className: 'w-[100px]',
    getCell: ({ row }) => {
      console.log(row);
      return (
        <HStack pos="center" spacing={8}>
          <OrderDetailDialog key={row._id} order={row} />
        </HStack>
      );
    },
  },
];
