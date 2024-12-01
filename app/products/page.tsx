import ProductGrid from '@/components/products/ProductGrid';
import { API_URL } from '@/helpers/env';
import { fetchData } from '@/helpers/fetch';
import { Product } from '@/types/custom-types';
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

  // Fetch products based on the search query
  const products = await fetchProducts(q);

  // Render the product grid if products are found
  if (products.length)
    return (
      <div className='container space-y-4 text-center py-12'>
        <ProductGrid products={products} />
      </div>
    );

  // Render a fallback message if no products are found
  return (
    <div className='container space-y-4 text-center py-12'>
      <h1 className='text-3xl font-bold'>No products found</h1>
    </div>
  );
};

// Helper function to fetch products from the API
async function fetchProducts(q?: string) {
  try {
    // Fetch products with an optional search query
    const res = await fetchData<Product[]>(`${API_URL}/products${q ? `?name_like=${q}` : ''}`);
    return res;
  } catch {
    // Return an empty array if the fetch fails
    return [];
  }
}

export default ProductsPage;
