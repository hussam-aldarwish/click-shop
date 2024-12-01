import LoginForm from '@/components/forms/LoginForm';
import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Login', // Title to be displayed in the browser tab
};

interface LoginPageProps {
  searchParams: Promise<{
    callbackUrl?: string; // URL to redirect after successful login
    error?: string; // Error message, if any
    code?: string; // Additional data/code from query parameters
  }>;
}

const LoginPage: FC<LoginPageProps> = async ({ searchParams }) => {
  // Extracting parameters from the resolved searchParams promise
  const { error, code, callbackUrl } = await searchParams;

  return (
    <>
      {/* Page heading */}
      <h1 className='text-4xl font-bold mb-8 text-center'>Login</h1>

      {/* Login form with extracted search parameters passed as props */}
      <LoginForm {...{ error, code, callbackUrl }} />

      {/* Footer with a link to the signup page */}
      <p className='text-center mt-4'>
        Don&apos;t have an account?{' '}
        <a href='/auth/signup' className='text-blue-500'>
          Sign up
        </a>
      </p>
    </>
  );
};

export default LoginPage;
