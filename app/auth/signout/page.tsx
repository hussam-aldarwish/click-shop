import { auth } from '@/auth';
import SignoutButton from '@/components/layout/SignoutButton';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Sign Out',
};

const SignOutPage = async () => {
  const session = await auth();

  if (!session) {
    redirect('/auth/login');
  }

  return (
    <>
      <h1 className='text-4xl font-bold mb-8 text-center'>Sign Out</h1>
      <SignoutButton />
    </>
  );
};

export default SignOutPage;
