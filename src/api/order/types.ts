import type { IMetaResponse, ITableQuery } from '@/types';
import type { ICartItem } from '../cart/types';
import type { IShippingAddress } from '@/stores/CheckoutStore';

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface IOrderQuery extends ITableQuery {
  status?: OrderStatus;
}

export interface IOrder {
  _id: string;
  orderNumber: string;
  userId: string;
  items: ICartItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: {
    type: string;
    details?: Record<string, any>;
  };
  status: OrderStatus;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderResponse {
  items: IOrder[];
  meta: IMetaResponse;
}
