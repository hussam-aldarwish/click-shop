import { getProductAction } from '@/actions/productActions';
import ProductDetails from '@/components/products/ProductDetails';
import getQueryClient from '@/lib/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { FC } from 'react';

interface PageProps {
  params: Promise<{ id: string }>;
}

const ProductDetailsPage: FC<PageProps> = async ({ params }) => {
  // Extract the `id` from the params
  // In nextjs 15, has become a promise and needs to be awaited
  const { id } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products', id],
    queryFn: () => getProductAction(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductDetails id={id} />
    </HydrationBoundary>
  );
};

export default ProductDetailsPage;
