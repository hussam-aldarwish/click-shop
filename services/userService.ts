import { API_URL } from '@/helpers/env';
import { fetchData } from '@/helpers/fetch';
import { hashPassword, verifyPassword } from '@/helpers/hashing';
import { User as NextAuthUser } from 'next-auth';

// Extend the User interface to include a password
interface User extends NextAuthUser {
  password: string;
}

class UserService {
  private endpoint = `${API_URL}/users`;

  getUsers = async ({ email }: { email?: string }) => {
    return fetchData<User[]>(email ? `${this.endpoint}?email=${email}` : this.endpoint);
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
    const hashedPassword = await hashPassword(password);
    const user = {
      name: fullName,
      email,
      password: hashedPassword,
    };

    try {
      await fetchData(this.endpoint, {
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
