import type { IMetaResponse, ITableQuery } from './../../types/index';

export const OrderStatus = {
  TO_PAY: 'TO_PAY',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED',
  REFUND: 'REFUND',
  EXPIRED: 'EXPIRED',
};

export type OrderStatusType = keyof typeof OrderStatus;
export type PaymentMethod = 'ONLINE_PAYMENT' | 'COD' | 'BANK_TRANSFER';

export interface IOrderItem {
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
  productName: string;
}

export interface IShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
}

export interface IOrderUser {
  _id: string;
  username: string;
  email: string;
}

export interface IOrder {
  _id: string;
  userId: IOrderUser;
  orderNumber: string;
  items: IOrderItem[];
  totalAmount: number;
  discountAmount: number;
  voucherId: string | null;
  status: OrderStatusType;
  paymentMethod: PaymentMethod;
  shippingAddress: IShippingAddress;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderQuery extends ITableQuery {
  status?: OrderStatusType;
  orderNumber?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
}

export interface IOrderResponse {
  items: IOrder[];
  meta: IMetaResponse;
}
