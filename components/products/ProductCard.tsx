import { Product } from '@/types/custom-types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { FaBookOpenReader } from 'react-icons/fa6';

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product: { id, name, description, image, price, tags },
}) => {
  return (
    <div className='relative bg-light rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:scale-105'>
      {/* Image Section */}
      <div className='relative h-60 overflow-hidden rounded-t-2xl'>
        <Link href={`/products/${id}`}>
          <Image
            src={image}
            alt={name}
            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
            width={500}
            height={500}
          />
        </Link>

        {/* Price Badge */}
        <div className='absolute bottom-3 left-3 bg-primary text-white text-sm font-bold px-3 py-1 rounded-md shadow-lg'>
          ${price.toFixed(2)}
        </div>

        {/* Wishlist Button */}
        <button
          title='Add to Wishlist'
          className='absolute top-3 right-3 bg-white text-primary p-2 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all'
        >
          <FaHeart />
        </button>
      </div>

      {/* Content Section */}
      <div className='p-6'>
        <Link href={`/products/${id}`}>
          <h2 className='text-lg font-bold text-dark truncate cursor-pointer'>{name}</h2>
        </Link>
        <p className='text-sm text-dark mt-2 line-clamp-2'>{description}</p>

        {/* Tags */}
        <div className='flex flex-wrap justify-center gap-2 mt-4'>
          {tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className='bg-accent text-white text-xs px-3 py-1 rounded-full shadow-sm'
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className='mt-6 flex justify-between items-center'>
          <button
            title='Add to Cart'
            className='flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary shadow-lg transition-all'
          >
            <FaShoppingCart />
            <span>Add to Cart</span>
          </button>
          <button
            title='View Details'
            className='flex items-center gap-2 text-primary border border-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white shadow-lg transition-all'
          >
            <FaBookOpenReader />
            <span>Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;