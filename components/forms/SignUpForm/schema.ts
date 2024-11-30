import { checkEmailAvailability } from '@/actions/userActions';
import { z } from 'zod';

const signUpFormSchema = z
  .object({
    fullName: z.string().min(1, 'Full Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string().min(8, 'Confirm Password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine(async (data) => checkEmailAvailability(data.email), {
    message:
      'There is already an account with this email address <br/>Please sign in <a href="/auth/login" class="text-primary">here</a>',
    path: ['email'],
  });

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export default signUpFormSchema;
