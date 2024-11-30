'use client';

import { Product } from '@/types/custom-types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: FC<ProductDetailsProps> = ({ product }) => {
  const router = useRouter();

  return (
    <div className='container mx-auto px-4 py-12'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
        {/* Main Product Image */}
        <div className='relative h-80 lg:h-[500px] overflow-hidden rounded-xl shadow-lg'>
          <Zoom
            zoomImg={{
              src: product.image,
              alt: product.name,
              width: 1000,
              height: 1000,
            }}
          >
            <Image
              src={product.image}
              alt={product.name}
              className='w-full h-full object-cover'
              width={500}
              height={500}
              priority
            />
          </Zoom>
        </div>

        {/* Product Details */}
        <div className='flex flex-col justify-between'>
          <div>
            <h1 className='text-4xl font-extrabold text-primary mb-4'>{product.name}</h1>
            <p className='text-lg mb-6'>{product.description}</p>
            <div className='flex items-center gap-4 mb-6'>
              <span className='text-2xl font-bold text-primary'>${product.price.toFixed(2)}</span>
              <div className='flex flex-wrap gap-2'>
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className='bg-accent text-white text-sm px-3 py-1 rounded-full shadow-sm transition-all hover:bg-primary'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              title='Add to Cart'
              className='flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary shadow-xl transition-all'
            >
              <FaShoppingCart />
              <span>Add to Cart</span>
            </button>
          </div>

          {/* Product Image Gallery */}
          <div className='mt-8'>
            <h3 className='text-xl font-bold mb-4'>Product Gallery</h3>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
              {product.images.map((img, index) => (
                <div
                  key={index}
                  className='relative h-32 overflow-hidden rounded-md shadow-md hover:scale-105 transition-all duration-300'
                >
                  <Zoom
                    zoomImg={{
                      src: product.image,
                      alt: product.name,
                      width: 1000,
                      height: 1000,
                    }}
                  >
                    <Image
                      src={img.url}
                      alt={img.title}
                      className='w-full h-full object-cover'
                      width={500}
                      height={500}
                    />
                  </Zoom>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className='mt-8 text-center'>
        <button
          className='bg-secondary text-white px-6 py-3 rounded-lg shadow-md hover:bg-primary transition-all'
          onClick={() => router.back()}
        >
          Back to Products
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
