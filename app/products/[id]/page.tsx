import ProductDetails from '@/components/products/ProductDetails';
import { API_URL } from '@/helpers/env';
import { fetchData } from '@/helpers/fetch';
import { Product } from '@/types/custom-types';
import { notFound } from 'next/navigation';
import { FC } from 'react';

interface PageProps {
  params: Promise<{ id: string }>;
}

const ProductDetailsPage: FC<PageProps> = async ({ params }) => {
  // Extract the `id` from the params
  // In nextjs 15, has become a promise and needs to be awaited
  const { id } = await params;

  // Fetch the product details using the ID
  const product = await fetchProductById(id);

  if (!product) {
    // If product not found, show 404 page
    notFound();
  }

  return <ProductDetails product={product} />;
};

// Function to fetch the product by ID
async function fetchProductById(id: string) {
  try {
    const res = await fetchData<Product>(`${API_URL}/products/${id}`);
    return res;
  } catch {
    return null;
  }
}

export default ProductDetailsPage;
