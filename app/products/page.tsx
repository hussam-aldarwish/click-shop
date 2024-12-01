import { getProductsAction } from '@/actions/productActions';
import ProductGrid from '@/components/products/ProductGrid';
import getQueryClient from '@/lib/getQueryClient';
import { PaginatedResponse, Product } from '@/types/custom-types';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Products', // Page title metadata
};

interface ProductsPageProps {
  searchParams: Promise<{
    q?: string; // Optional query parameter for product search
  }>;
}

const ProductsPage: FC<ProductsPageProps> = async ({ searchParams }) => {
  // Extract the search query parameter
  const { q } = await searchParams;

  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['products', { q }],
    queryFn: ({ pageParam }) =>
      getProductsAction({ name: q, page: pageParam as number }) as Promise<
        PaginatedResponse<Product>
      >,
    retry: 0,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className='container space-y-4 text-center py-12'>
      <HydrationBoundary state={dehydratedState}>
        <ProductGrid q={q} />
      </HydrationBoundary>
    </div>
  );
};

export default ProductsPage;
