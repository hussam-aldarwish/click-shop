'use client';

import ShoppingCartContext from '@/contexts/ShoppingCartContext';
import { useContext } from 'react';

const useShoppingCart = () => {
  const shoppingCartContext = useContext(ShoppingCartContext);
  if (!shoppingCartContext) {
    throw new Error('useShoppingCart must be used within a ShoppingCartProvider');
  }
  return shoppingCartContext;
};

export default useShoppingCart;
