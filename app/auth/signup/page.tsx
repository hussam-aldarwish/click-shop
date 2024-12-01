import SignUpForm from '@/components/forms/SignUpForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
};

const SignUpPage = () => {
  return (
    <>
      {/* Page heading */}
      <h1 className='text-4xl font-bold mb-8 text-center'>Sign Up</h1>

      {/* Sign-up form */}
      <SignUpForm />

      {/* Link to log in if the user already has an account */}
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
