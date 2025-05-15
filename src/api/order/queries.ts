import { createMutation, createQuery } from 'react-query-kit';
import { cancelOrder, getOrderById, getOrders } from './requests';
import type { IOrder, IOrderQuery, IOrderResponse } from './types';

export const useOrdersQuery = createQuery<IOrderResponse, Partial<IOrderQuery>>({
  queryKey: ['orders'],
  fetcher: (params) => getOrders(params),
});

export const useOrderByIdQuery = createQuery<IOrder, string>({
  queryKey: ['orders/detail'],
  fetcher: (orderId) => getOrderById(orderId),
});

export const useCancelOrderMutation = createMutation<IOrder, string>({
  mutationKey: ['orders/cancel'],
  mutationFn: (orderId) => cancelOrder(orderId),
});
