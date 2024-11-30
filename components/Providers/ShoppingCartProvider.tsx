'use client';

import ShoppingCartContext, { CartItem } from '@/contexts/ShoppingCartContext';
import { FC, PropsWithChildren, useEffect, useState } from 'react';

const ShoppingCartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = async (item: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) => (i.id === item.id ? { ...i, count: i.count + item.count } : i));
      }
      return [...prevItems, item];
    });
  };

  const removeFromCart = async (id: string) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === id);
      if (existingItem) {
        if (existingItem.count > 1) {
          return prevItems.map((i) => (i.id === id ? { ...i, count: i.count - 1 } : i));
        }
        return prevItems.filter((i) => i.id !== id);
      }
      return prevItems;
    });
  };

  useEffect(() => {
    const savedItems = localStorage.getItem('shoppingCart');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(items));
  }, [items]);

  return (
    <ShoppingCartContext.Provider value={{ cart: items, addToCart, removeFromCart }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
