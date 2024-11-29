import { Product } from '@/types/custom-types';
import React from 'react';
import ProductCard from './ProductCard';

type ProductGridProps = {
  products: Product[];
};

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-4xl font-extrabold text-primary text-center mb-12'>
        Discover Our Exclusive Products
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
