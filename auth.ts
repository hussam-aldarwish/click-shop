import JSONServerAdapter from '@/lib/jsonServerAdapter';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { API_URL } from './helpers/env';
import userService from './services/userService';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: JSONServerAdapter(API_URL),
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async ({ email, password }) => {
        try {
          const user = await userService.signIn(email as string, password as string);
          return user;
        } catch {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      const user = await userService.getUsers({ email: token.email as string });
      session.user.id = user[0].id as string;
      return session;
    },
    // Protect the /user route
    authorized: ({ auth, request }) => {
      if (request.nextUrl.pathname.startsWith('/user')) {
        return !!auth;
      }
      return true;
    },
  },
});
