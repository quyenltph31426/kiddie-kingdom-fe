import type { IMetaResponse, ITableQuery } from './../../types/index';

export const OrderStatus = {
  TO_PAY: 'TO_PAY',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED',
  REFUND: 'REFUND',
  EXPIRED: 'EXPIRED',
};

export const ShippingStatus = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELED: 'CANCELED',
};

export const PaymentStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
};

export type OrderStatusType = keyof typeof OrderStatus;
export type ShippingStatusType = keyof typeof ShippingStatus;
export type PaymentStatusType = keyof typeof PaymentStatus;
export type PaymentMethod = 'ONLINE_PAYMENT' | 'COD' | 'BANK_TRANSFER';

export interface IOrderItem {
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
  _id: string;
  productName: string;
  productImage: string;
  attributes: Record<string, string>;
}

export interface IShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  district: string;
  ward: string;
  postalCode?: string;
}

export interface IOrderUser {
  _id: string;
  username: string;
  email: string;
}

export interface IOrder {
  _id: string;
  userId: IOrderUser;
  orderCode: string;
  items: IOrderItem[];
  totalAmount: number;
  discountAmount: number;
  voucherId: string | null;
  status: OrderStatusType;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatusType;
  shippingStatus: ShippingStatusType;
  shippingAddress: IShippingAddress;
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
}

export interface IOrderQuery extends ITableQuery {
  status?: OrderStatusType;
  paymentStatus?: PaymentStatusType;
  shippingStatus?: ShippingStatusType;
  paymentMethod?: string;
  orderNumber?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
}

export interface IOrderResponse {
  items: IOrder[];
  meta: IMetaResponse;
}
