'use server';

import productService from '@/services/productService';

export const getProductsAction = async ({
  name,
  page,
  perPage,
}: {
  name?: string;
  page?: number;
  perPage?: number;
}) => productService.getProducts({ name, page, perPage });

export const getProductAction = async (id: string) => productService.getProduct(id);
