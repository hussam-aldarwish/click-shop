'use client';

import { getCsrfToken } from 'next-auth/react';
import { FC, useEffect, useState } from 'react';

interface LoginFormProps {
  callbackUrl?: string;
  error?: string;
  code?: string;
}

const LoginForm: FC<LoginFormProps> = ({ code, error, callbackUrl = '/' }) => {
  const [csrfToken, setCsrfToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    getCsrfToken().then(setCsrfToken);
  }, []);

  return (
    <form method='post' action='/api/auth/callback/credentials' className='space-y-6'>
      <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
      <input name='callbackUrl' type='hidden' defaultValue={callbackUrl} />
      <div>
        <label htmlFor='email' className='block text-sm font-medium mb-1'>
          Email
        </label>
        <input
          type='email'
          id='email'
          name='email'
          className='w-full p-3 border rounded-md bg-light dark:bg-neutral text-foreground'
        />
      </div>

      <div>
        <label htmlFor='password' className='block text-sm font-medium mb-1'>
          Password
        </label>
        <input
          type='password'
          id='password'
          name='password'
          className='w-full p-3 border rounded-md bg-light dark:bg-neutral text-foreground'
        />
      </div>

      {error === 'CredentialsSignin' && code === 'credentials' && (
        <p className='text-red-500 text-center mt-2'>Invalid email or password</p>
      )}

      <div>
        <button
          type='submit'
          className='w-full p-3 bg-primary text-light dark:text-dark rounded-md font-semibold'
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
