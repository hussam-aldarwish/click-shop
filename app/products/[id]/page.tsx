import ProductDetails from '@/components/products/ProductDetails';
import { API_URL } from '@/herlpers/env';
import { Product } from '@/types/custom-types';
import { notFound } from 'next/navigation';
import { FC } from 'react';

// Function to fetch the product by ID
async function fetchProductById(id: string): Promise<Product | null> {
  const product = await fetch(API_URL + '/products/' + id)
    .then((res) => (res.ok ? res.json() : null))
    .catch(() => null);
  return product;
}

type ProductDetailsProps = {
  params: Promise<{ id: string }>;
};

const ProductDetailsPage: FC<ProductDetailsProps> = async ({ params }) => {
  // Extract the `id` from the params
  // In nextjs 15, has become a promise and needs to be awaited
  const { id } = await params;

  // Fetch the product details using the ID
  const product: Product | null = await fetchProductById(id);

  if (!product) {
    // If product not found, show 404 page
    notFound();
  }

  return <ProductDetails product={product} />;
};

export default ProductDetailsPage;
