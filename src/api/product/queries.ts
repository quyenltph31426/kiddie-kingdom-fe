import { createQuery } from 'react-query-kit';
import { getProductByIdOrSlug, getProductBySlug, getProducts, getProductsBestSeller, getProductsRelated } from './requests';
import type { IProduct, IProductQuery, IProductResponse } from './types';

export const useProductsQuery = createQuery<IProductResponse, Partial<IProductQuery>>({
  queryKey: ['products'],
  fetcher: (params) => getProducts(params),
});

export const useProductsBestSeller = createQuery<IProductResponse, Partial<IProductQuery>>({
  queryKey: ['products/best-seller'],
  fetcher: (params) => getProductsBestSeller(params),
});

export const useProductsRelated = createQuery<IProductResponse, { params: Partial<IProductQuery>; productId: string }>({
  queryKey: ['products/related'],
  fetcher: (params) => getProductsRelated(params),
});

export const useProductByIdOrSlugQuery = createQuery<IProduct, string>({
  queryKey: ['product'],
  fetcher: (id) => getProductByIdOrSlug(id),
});

export const useProductBySlugQuery = createQuery<IProduct, string>({
  queryKey: ['product-by-slug'],
  fetcher: (slug) => getProductBySlug(slug),
});
