import ProductGrid from '@/components/products/ProductGrid';
import { API_URL } from '@/herlpers/env';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products',
};

const Products = async () => {
  const products = await fetch(API_URL + '/products')
    .then((res) => (res.ok ? res.json() : []))
    .catch(() => []);
  return (
    <div className='container space-y-4 text-center py-12'>
      <ProductGrid products={products} />
    </div>
  );
};

export default Products;
