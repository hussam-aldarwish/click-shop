import LoginForm from '@/components/forms/LoginForm';
import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Login',
};

interface LoginPageProps {
  searchParams: Promise<{
    callbackUrl?: string;
    error?: string;
    code?: string;
  }>;
}

const LoginPage: FC<LoginPageProps> = async ({ searchParams }) => {
  const { error, code, callbackUrl } = await searchParams;
  return (
    <>
      <h1 className='text-4xl font-bold mb-8 text-center'>Login</h1>
      <LoginForm {...{ error, code, callbackUrl }} />
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
