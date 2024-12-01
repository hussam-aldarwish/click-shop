import { auth } from '@/auth';
import SignoutButton from '@/components/layout/SignoutButton';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Sign Out',
};

const SignOutPage = async () => {
  // Check if the user is authenticated
  const session = await auth();

  // Redirect to the login page if there is no active session
  if (!session) {
    redirect('/auth/login');
  }

  // Render the sign-out page with a sign-out button
  return (
    <>
      <h1 className='text-4xl font-bold mb-8 text-center'>Sign Out</h1>
      <SignoutButton />
    </>
  );
};

export default SignOutPage;
