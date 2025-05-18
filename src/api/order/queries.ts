import { createQuery, createMutation } from 'react-query-kit';
import { getOrders, getOrderById, updateOrderStatus, updateShippingStatus, updatePaymentStatus } from './requests';
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

// Add new mutations for shipping and payment status
export const useUpdateShippingStatusMutation = createMutation<IOrder, { id: string; status: string }>({
  mutationFn: ({ id, status }) => updateShippingStatus({ id, status }),
});

export const useUpdatePaymentStatusMutation = createMutation<IOrder, { id: string; status: string }>({
  mutationFn: ({ id, status }) => updatePaymentStatus({ id, status }),
});
