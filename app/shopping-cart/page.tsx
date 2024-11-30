import ShoppingCartDetails from '@/components/shopping-cart/ShoppingCartDetails';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'Shopping cart page',
};

const ShoppingCartPage = () => {
  return <ShoppingCartDetails />;
};

export default ShoppingCartPage;
