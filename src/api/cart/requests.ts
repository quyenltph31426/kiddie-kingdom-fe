import client from '../axios';
import type { IAddToCartRequest, ICartItem, ICartResponse, IMergeCartRequest, IUpdateCartRequest } from './types';

export const getCart = async (): Promise<ICartResponse> => {
  const { data } = await client({
    url: '/api/cart',
    method: 'GET',
  });
  return data?.data;
};

export const addToCart = async (cartItem: IAddToCartRequest): Promise<ICartItem> => {
  const { data } = await client({
    url: '/api/cart',
    method: 'POST',
    data: cartItem,
  });
  return data?.data;
};

export const updateCartItem = async (updateData: IUpdateCartRequest): Promise<ICartItem> => {
  const { data } = await client({
    url: `/api/cart/${updateData.cartItemId}`,
    method: 'PUT',
    data: { quantity: updateData.quantity },
  });
  return data?.data;
};

export const removeFromCart = async (cartItemId: string): Promise<boolean> => {
  const { data } = await client({
    url: `/api/cart/${cartItemId}`,
    method: 'DELETE',
  });
  return data?.success || false;
};

export const mergeCart = async (mergeData: IMergeCartRequest): Promise<ICartResponse> => {
  const { data } = await client({
    url: '/api/cart/merge',
    method: 'POST',
    data: mergeData,
  });
  return data?.data;
};

export const clearCart = async (): Promise<boolean> => {
  const { data } = await client({
    url: '/api/cart/clear',
    method: 'DELETE',
  });
  return data?.success || false;
};
