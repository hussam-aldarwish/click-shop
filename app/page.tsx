import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | Click Shop',
};

const Home = () => {
  return (
    <div className='container space-y-4 text-center'>
      <h1 className='mt-4'>Welcome to Click Shop</h1>
      <p>Click Shop is an e-commerce platform for all your shopping needs.</p>
    </div>
  );
};

export default Home;
