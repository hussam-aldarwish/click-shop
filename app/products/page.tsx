import ProductGrid from '@/components/products/ProductGrid';
import { API_URL } from '@/helpers/env';
import { fetchData } from '@/helpers/fetch';
import { Product } from '@/types/custom-types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products',
};

const ProductsPage = async () => {
  const products = await fetchProducts();

  if (products.length)
    return (
      <div className='container space-y-4 text-center py-12'>
        <ProductGrid products={products} />
      </div>
    );

  return (
    <div className='container space-y-4 text-center py-12'>
      <h1 className='text-3xl font-bold'>No products found</h1>
    </div>
  );
};

async function fetchProducts() {
  try {
    const res = await fetchData<Product[]>(`${API_URL}/products`);
    return res;
  } catch {
    return [];
  }
}

export default ProductsPage;
