import type { ProductSchema } from '@/modules/CreateProductPage/libs/validators';
import client from '../axios';
import type { IProduct, IProductQuery, IProductResponse } from './types';

export const getProducts = async (params: Partial<IProductQuery>): Promise<IProductResponse> => {
  const { data } = await client({
    url: '/api/admin/products',
    method: 'GET',
    params,
  });
  return data?.data;
};

export const getProductById = async (id: string): Promise<IProduct> => {
  const { data } = await client({
    url: `/api/admin/products/${id}`,
    method: 'GET',
  });
  return data?.data;
};

export const createProduct = async (formData: ProductSchema): Promise<IProduct> => {
  const { data } = await client({
    url: '/api/admin/products',
    method: 'POST',
    data: formData,
  });
  return data?.data;
};

export const updateProduct = async ({
  id,
  formData,
}: {
  id: string;
  formData: Partial<ProductSchema>;
}): Promise<IProduct> => {
  const { data } = await client({
    url: `/api/admin/products/${id}`,
    method: 'PUT',
    data: formData,
  });
  return data?.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  const { data } = await client({
    url: `/api/admin/products/${id}`,
    method: 'DELETE',
  });
  return data?.data;
};
