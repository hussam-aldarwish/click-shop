'use client';

import { signUpAction } from '@/actions/userActions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import signUpFormSchema from './schema';

const SignUpForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      image: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    try {
      signUpAction(data);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'User created successfully',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then(() => {
        location.href = '/';
      });
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to create user',
      });
    }
  });

  return (
    <form onSubmit={onSubmit} className='space-y-6'>
      <div>
        <label htmlFor='fullName' className='block text-sm font-medium mb-1'>
          Full Name
        </label>
        <input
          type='text'
          id='fullName'
          {...register('fullName')}
          className='w-full p-3 border rounded-md bg-light dark:bg-neutral text-foreground'
        />
        {errors.fullName && <p className='text-red-500 text-sm mt-2'>{errors.fullName.message}</p>}
      </div>

      <div>
        <label htmlFor='email' className='block text-sm font-medium mb-1'>
          Email
        </label>
        <input
          type='email'
          id='email'
          {...register('email')}
          className='w-full p-3 border rounded-md bg-light dark:bg-neutral text-foreground'
        />
        {errors.email && (
          <p
            className='text-red-500 text-sm mt-2'
            dangerouslySetInnerHTML={{ __html: errors.email.message as string }}
          />
        )}
      </div>

      <div>
        <label htmlFor='password' className='block text-sm font-medium mb-1'>
          Password
        </label>
        <input
          type='password'
          id='password'
          {...register('password')}
          className='w-full p-3 border rounded-md bg-light dark:bg-neutral text-foreground'
        />
        {errors.password && <p className='text-red-500 text-sm mt-2'>{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor='confirmPassword' className='block text-sm font-medium mb-1'>
          Confirm Password
        </label>
        <input
          type='password'
          id='confirmPassword'
          {...register('confirmPassword')}
          className='w-full p-3 border rounded-md bg-light dark:bg-neutral text-foreground'
        />
        {errors.confirmPassword && (
          <p className='text-red-500 text-sm mt-2'>{errors.confirmPassword.message}</p>
        )}
      </div>

      <div>
        <button
          type='submit'
          className='w-full p-3 bg-primary text-light dark:text-dark rounded-md font-semibold'
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
