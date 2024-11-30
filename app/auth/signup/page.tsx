import SignUpForm from '@/components/forms/SignUpForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
};

const SignUpPage = () => {
  return (
    <>
      <h1 className='text-4xl font-bold mb-8 text-center'>Sign Up</h1>
      <SignUpForm />
      <p className='text-center mt-4'>
        Already have an account?{' '}
        <a href='/auth/login' className='text-blue-500'>
          Log in
        </a>
      </p>
    </>
  );
};

export default SignUpPage;
