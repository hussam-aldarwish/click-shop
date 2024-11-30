'use server';

import { signIn } from '@/auth';
import userService from '@/services/userService';
import { revalidatePath } from 'next/cache';

export const signUp = async ({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) => {
  const user = await userService.createUser({ fullName, email, password });

  if (!user) {
    return {
      success: false,
      message: 'Failed to create user',
    };
  }

  await signIn('credentials', { email, password, redirect: false });
  revalidatePath('/auth/signup');

  return {
    success: true,
    message: 'User created',
  };
};

export const checkEmailAvailability = async (email: string) => {
  const users = await userService.getUsers({ email });

  return !users.length;
};
