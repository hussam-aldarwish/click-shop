'use server';

import { signIn } from '@/auth';
import userService from '@/services/userService';
import { revalidatePath } from 'next/cache';

// Action to handle user sign-up
export const signUpAction = async ({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) => {
  // Attempt to create a new user using the userService
  const user = await userService.createUser({ fullName, email, password });

  // If user creation fails, return an error response
  if (!user) {
    return {
      success: false,
      message: 'Failed to create user',
    };
  }

  // Sign in the user automatically after successful account creation
  await signIn('credentials', { email, password, redirect: false });

  // Revalidate the cache for the sign-up page to ensure fresh data
  revalidatePath('/auth/signup');

  // Return a success response after completing the process
  return {
    success: true,
    message: 'User created',
  };
};

// Action to check if an email is already in use
export const checkEmailAvailabilityAction = async (email: string) => {
  // Fetch users with the provided email
  const users = await userService.getUsers({ email });

  // Return true if no users with the email exist, indicating availability
  return !users.length;
};
