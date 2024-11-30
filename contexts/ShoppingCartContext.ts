import { createContext } from 'react';

export type CartItem = {
  id: string;
  name: string;
  count: number;
  price: number;
};

interface ShoppingCartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

export default ShoppingCartContext;
