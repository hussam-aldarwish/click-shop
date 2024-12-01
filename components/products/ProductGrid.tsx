'use client';

import { getProductsAction } from '@/actions/productActions';
import { PaginatedResponse, Product } from '@/types/custom-types';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';
import { FaSpinner } from 'react-icons/fa6';
import ProductCard from './ProductCard';

type ProductGridProps = {
  q?: string;
};

const ProductGrid: React.FC<ProductGridProps> = ({ q }) => {
  const { data, error, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      initialPageParam: 1,
      queryKey: ['products', { q }],
      queryFn: ({ pageParam }) =>
        getProductsAction({ name: q, page: pageParam as number }) as Promise<
          PaginatedResponse<Product>
        >,
      getNextPageParam: (lastPage) => lastPage.next,
    });

  const observerRef = useRef<IntersectionObserver>();
  const lastElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFetchingNextPage) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (lastElementRef.current) observerRef.current.observe(lastElementRef.current);
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-4xl font-extrabold text-primary text-center mb-12'>
        Discover Our Exclusive Products
      </h1>
      {isLoading && <p className='text-center text-lg'>Loading...</p>}
      {error && <p className='text-center text-lg text-red-500 mb-4'>{error.message}</p>}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </React.Fragment>
        ))}
        {isFetchingNextPage && (
          <div className='bg-light text-dark text-center py-4 rounded-lg shadow-lg flex items-center justify-center gap-2 min-h-40'>
            <FaSpinner className='animate-spin' />
            Loading more products...
          </div>
        )}
        <div ref={lastElementRef} />
      </div>
    </div>
  );
};

export default ProductGrid;
