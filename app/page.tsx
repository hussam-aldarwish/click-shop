import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Home | Click Shop',
};

const Home = () => {
  redirect('/products');
};

export default Home;
