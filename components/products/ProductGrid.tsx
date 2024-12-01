'use client';

import { getProductsAction } from '@/actions/productActions';
import { PaginatedResponse, Product } from '@/types/custom-types';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
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
      retry: true,
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

  const [showBootNotification, setShowBootNotification] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isLoading) {
      timer = setTimeout(() => {
        setShowBootNotification(true);
      }, 5000); // Show notification after 5 seconds of loading
    } else {
      setShowBootNotification(false); // Hide notification when loading is complete
    }

    return () => {
      if (timer) clearTimeout(timer); // Cleanup timeout
    };
  }, [isLoading]);

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-4xl font-extrabold text-primary text-center mb-12'>
        Discover Our Exclusive Products
      </h1>
      {(isLoading || showBootNotification) && (
        <div className='py-8 bg-light text-dark text-center rounded-lg shadow-lg flex items-center justify-center gap-2 mb-4'>
          <FaSpinner className='animate-spin' />
          {showBootNotification
            ? 'Loading data is taking longer than usual. The backend server may be booting up, please wait...'
            : 'Loading products...'}
        </div>
      )}
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
