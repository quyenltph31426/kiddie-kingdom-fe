import { createQuery, createMutation } from 'react-query-kit';
import { getOrders, getOrderById, updateOrderStatus } from './requests';
import type { IOrderResponse, IOrder, IOrderQuery } from './types';

export const useOrdersQuery = createQuery<IOrderResponse, Partial<IOrderQuery>>({
  queryKey: ['admin/orders'],
  fetcher: (params) => getOrders(params),
});

export const useOrderByIdQuery = createQuery<IOrder, string>({
  queryKey: ['order'],
  fetcher: (id) => getOrderById(id),
});

export const useUpdateOrderStatusMutation = createMutation<IOrder, { id: string; status: string }>({
  mutationFn: ({ id, status }) => updateOrderStatus({ id, status }),
});
