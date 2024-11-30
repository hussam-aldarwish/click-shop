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
    </>
  );
};

export default LoginPage;
