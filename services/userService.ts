import { API_URL } from '@/helpers/env';
import { fetchData } from '@/helpers/fetch';
import { hashPassword, verifyPassword } from '@/helpers/hashing';
import { User as NextAuthUser } from 'next-auth';

// Extend the User interface to include a password
interface User extends NextAuthUser {
  password: string;
}

class UserService {
  // Construct the full URL for a given endpoint
  private getUrl = (endpoint: string) => `${API_URL}/${endpoint}`;

  getUsers = async (params: { email?: string }) => {
    const { email } = params;
    return fetchData<User[]>(this.getUrl(`users${email ? `?email=${email}` : ''}`));
  };

  createUser = async ({
    fullName,
    email,
    password,
  }: {
    fullName: string;
    email: string;
    password: string;
  }) => {
    // Generate a unique ID for the user
    const id = Math.random().toString(36).substring(2) + Date.now().toString(36);
    const hashedPassword = await hashPassword(password);
    const user = {
      id,
      name: fullName,
      email,
      password: hashedPassword,
    };

    try {
      await fetchData(this.getUrl('users'), {
        method: 'POST',
        body: JSON.stringify(user),
      });

      return true;
    } catch {
      return null;
    }
  };

  signIn = async (email: string, password: string) => {
    const users = await this.getUsers({ email });

    if (!users.length) {
      // Throwing generic error message to avoid leaking user information
      throw new Error('Authentication failed');
    }

    const user = users[0];
    const { password: userPassword, ...userWithoutPassword } = user;

    const isValidPassword = await verifyPassword(password, userPassword);
    if (!isValidPassword) {
      throw new Error('Authentication failed');
    }

    return userWithoutPassword;
  };
}

const userService = new UserService();

export default userService;
