import type { IShippingAddress } from '@/stores/CheckoutStore';
import type { IMetaResponse, ITableQuery } from '@/types';
import type { ICartItem } from '../cart/types';

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPING' | 'COMPLETED' | 'CANCELLED';
export type PaymentMethod = 'CASH_ON_DELIVERY' | 'ONLINE_PAYMENT';

export interface IOrderItem {
  _id: string;
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
  productName: string;
  image?: string;
}

export interface IShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  district?: string;
  ward?: string;
  postalCode: string;
}

export interface IOrder {
  _id: string;
  userId: string;
  orderNumber: string;
  items: IOrderItem[];
  totalAmount: number;
  discountAmount: number;
  voucherId: string | null;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  shippingAddress: IShippingAddress;
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  paymentUrl?: string;
}

export interface IOrderResponse {
  items: IOrder[];
  meta: IMetaResponse;
}

export interface ICreateOrderItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface ICreateOrderShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  district?: string;
  ward?: string;
  postalCode: string;
  isDefault?: boolean;
}

export interface ICreateOrderRequest {
  items: ICreateOrderItem[];
  paymentMethod: PaymentMethod;
  shippingAddress: ICreateOrderShippingAddress;
  voucherId?: string;
  notes?: string;
}

