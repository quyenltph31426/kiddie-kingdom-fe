import { type IOrderQuery, OrderStatus } from '@/api/order/types';
import { Badge } from '@/components/ui/badge';
import type { ITableColumn } from '@/components/ui/table';
import { HStack } from '@/components/utilities';
import { formatCurrency } from '@/libs/common';
import { format } from 'date-fns';

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

export const PAYMENT_METHOD_LABELS = {
  ONLINE_PAYMENT: 'Online Payment',
  COD: 'Cash on Delivery',
  BANK_TRANSFER: 'Bank Transfer',
};

export const getStatusBadge = (status: string) => {
  const statusOption = ORDER_STATUS_OPTIONS.find((option) => option.value === status);
  return <Badge className={statusOption?.color || 'bg-gray-100 text-gray-800'}>{statusOption?.label || status}</Badge>;
};

export const COLUMNS = (refetch: any): ITableColumn[] => [
  {
    title: 'Order Number',
    key: 'orderNumber',
    align: 'left',
    className: 'w-[180px]',
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
    title: 'Status',
    key: 'status',
    align: 'center',
    getCell: ({ row }) => <HStack pos="center">{getStatusBadge(row.status)}</HStack>,
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
    title: 'Created At',
    key: 'createdAt',
    align: 'center',
    getCell: ({ row }) => <div className="px-2 py-1 text-center">{format(new Date(row.createdAt), 'dd/MM/yyyy HH:mm')}</div>,
  },
];
