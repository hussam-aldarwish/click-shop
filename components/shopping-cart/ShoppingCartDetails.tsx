'use client';

import useShoppingCart from '@/hooks/useShoppingCart';
import Link from 'next/link';

interface CartItem {
  id: string;
  name: string;
  price: number;
  count: number;
}

const ShoppingCartDetails = () => {
  const { cart, addToCart, removeFromCart } = useShoppingCart();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.count, 0).toFixed(2);
  };

  return (
    <div className='min-h-screen bg-background text-foreground flex flex-col items-center p-6'>
      <div className='w-full max-w-4xl bg-white shadow-lg rounded-lg p-6'>
        <h2 className='text-3xl font-poppins font-semibold text-primary mb-6'>Shopping Cart</h2>

        <div className='space-y-4'>
          {cart.map((item: CartItem) => (
            <div key={item.id} className='flex justify-between items-center border-b py-4'>
              <div className='flex items-center space-x-4'>
                <div className='text-lg font-roboto font-medium text-primary'>{item.name}</div>
                <div className='text-sm text-neutral'>x{item.count}</div>
              </div>

              <div className='flex items-center space-x-4'>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className='px-3 py-1 text-sm bg-secondary text-white rounded-lg hover:bg-secondary/80'
                >
                  -
                </button>
                <span className='text-lg font-roboto font-medium text-accent'>
                  ${(item.price * item.count).toFixed(2)}
                </span>
                <button
                  onClick={() => addToCart(item)}
                  className='px-3 py-1 text-sm bg-primary text-white rounded-lg hover:bg-primary/80'
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-6 flex justify-between items-center text-lg font-roboto font-semibold text-primary'>
          <span>Total:</span>
          <span>${calculateTotal()}</span>
        </div>

        <div className='mt-6 flex justify-center space-x-4'>
          <button className='px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/80'>
            Checkout
          </button>
          <Link
            href='/products'
            className='px-6 py-2 bg-neutral text-foreground rounded-lg hover:bg-neutral/80'
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartDetails;
