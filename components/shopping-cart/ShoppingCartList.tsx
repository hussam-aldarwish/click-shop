'use client';

import useShoppingCart from '@/hooks/useShoppingCart';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Link from 'next/link';
import { FaShoppingBag } from 'react-icons/fa';

const ShoppingCartList = () => {
  const { cart } = useShoppingCart();
  const totalCount = cart.reduce((total, item) => total + item.count, 0);
  return (
    <Menu as='div' className='relative ml-4'>
      <div>
        <MenuButton className='text-light flex items-center space-x-2'>
          <FaShoppingBag size={32} className='p-1 bg-secondary rounded-full' />
          <span className='text-dark'>{totalCount}</span>
        </MenuButton>
      </div>
      <MenuItems
        transition
        className='absolute right-0 mt-2 z-10 w-72 bg-light text-dark rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
      >
        <div className='py-1'>
          {cart.length ? (
            <>
              {cart.map((item) => (
                <MenuItem key={item.id}>
                  <div className='flex items-center justify-between px-4 py-2 hover:bg-gray-100'>
                    <span>{item.name}</span>
                    <span>{item.count}</span>
                  </div>
                </MenuItem>
              ))}
              <MenuItem>
                <hr />
              </MenuItem>
              <MenuItem>
                <div className='flex justify-between px-4 py-2'>
                  <span>Total:</span>
                  <span>
                    ${cart.reduce((total, item) => total + item.price * item.count, 0).toFixed(2)}
                  </span>
                </div>
              </MenuItem>
              <MenuItem>
                <div className='px-4 py-2 text-center flex'>
                  <Link
                    href='/shopping-cart'
                    className='bg-accent text-dark px-4 py-2 rounded-lg w-full hover:bg-accent/80'
                  >
                    Checkout
                  </Link>
                </div>
              </MenuItem>
            </>
          ) : (
            <MenuItem>
              <div className='px-4 py-2 text-center'>No items in cart</div>
            </MenuItem>
          )}
        </div>
      </MenuItems>
    </Menu>
  );
};

export default ShoppingCartList;
