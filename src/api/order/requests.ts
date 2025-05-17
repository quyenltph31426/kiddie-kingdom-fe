import client from '../axios';
import type { IOrder, IOrderQuery, IOrderResponse } from './types';

export const getOrders = async (params: Partial<IOrderQuery>): Promise<IOrderResponse> => {
  const { data } = await client({
    url: '/api/admin/orders',
    method: 'GET',
    params,
  });
  return data?.data;
};

export const getOrderById = async (id: string): Promise<IOrder> => {
  const { data } = await client({
    url: `/api/admin/orders/${id}`,
    method: 'GET',
  });
  return data?.data;
};

export const updateOrderStatus = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}): Promise<IOrder> => {
  const { data } = await client({
    url: `/api/admin/orders/${id}`,
    method: 'PATCH',
    data: { status },
  });
  return data?.data;
};

export const updateShippingStatus = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}): Promise<IOrder> => {
  const { data } = await client({
    url: `/api/admin/orders/${id}`,
    method: 'PATCH',
    data: { shippingStatus: status },
  });
  return data?.data;
};

export const updatePaymentStatus = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}): Promise<IOrder> => {
  const { data } = await client({
    url: `/api/admin/orders/${id}`,
    method: 'PATCH',
    data: { paymentStatus: status },
  });
  return data?.data;
};
