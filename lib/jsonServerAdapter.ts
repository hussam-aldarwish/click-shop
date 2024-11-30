import { fetchData } from '@/helpers/fetch';
import { Adapter } from 'next-auth/adapters';

// JSONServerAdapter factory function
const JSONServerAdapter = (baseUrl: string): Adapter => {
  // Construct the full URL for a given endpoint
  const getUrl = (endpoint: string) => `${baseUrl}/${endpoint}`;

  return {
    // Create a new user
    createUser: (user) =>
      fetchData(getUrl('users'), {
        method: 'POST',
        body: JSON.stringify(user),
      }),

    // Get user by ID
    getUser: (id) => fetchData(getUrl(`users/${id}`)),

    // Get user by email
    getUserByEmail: async (email) => {
      const users = await fetchData(getUrl(`users?email=${email}`));
      return users[0] || null;
    },

    // Get user by account (provider and providerAccountId)
    getUserByAccount: async ({ provider, providerAccountId }) => {
      const accounts = await fetchData(
        getUrl(`accounts?provider=${provider}&providerAccountId=${providerAccountId}`),
      );

      // If no accounts found, return null
      if (accounts.length === 0) return null;

      // Fetch and return the user associated with the account
      return fetchData(getUrl(`users/${accounts[0].userId}`));
    },

    // Update user information
    updateUser: ({ id, ...user }) =>
      fetchData(getUrl(`users/${id}`), {
        method: 'PATCH',
        body: JSON.stringify(user),
      }),

    // Delete a user by ID
    deleteUser: async (userId) => {
      await fetchData(getUrl(`users/${userId}`), { method: 'DELETE' });
    },

    // Link an account to a user
    linkAccount: async (account) => {
      await fetchData(getUrl('accounts'), {
        method: 'POST',
        body: JSON.stringify(account),
      });
    },

    // Unlink an account from a user
    unlinkAccount: async ({ provider, providerAccountId }) => {
      const accounts = await fetchData(
        getUrl(`accounts?provider=${provider}&providerAccountId=${providerAccountId}`),
      );

      // If no account found, no action is needed
      if (accounts.length === 0) return;

      // Delete the account from the server
      await fetchData(getUrl(`accounts/${accounts[0].id}`), { method: 'DELETE' });
    },

    // Create a new session
    createSession: (session) =>
      fetchData(getUrl('sessions'), {
        method: 'POST',
        body: JSON.stringify(session),
      }),

    // Get session and associated user by session token
    getSessionAndUser: async (sessionToken) => {
      const sessions = await fetchData(getUrl(`sessions?sessionToken=${sessionToken}`));
      if (sessions.length === 0) return null;

      // Fetch the user associated with the session
      const user = await fetchData(getUrl(`users/${sessions[0].userId}`));
      return { session: sessions[0], user };
    },

    // Update an existing session
    updateSession: ({ sessionToken, ...session }) =>
      fetchData(getUrl(`sessions/${sessionToken}`), {
        method: 'PATCH',
        body: JSON.stringify(session),
      }),

    // Delete a session by session token
    deleteSession: async (sessionToken) => {
      const sessions = await fetchData(getUrl(`sessions?sessionToken=${sessionToken}`));
      if (sessions.length === 0) return;

      // Delete the session from the server
      await fetchData(getUrl(`sessions/${sessions[0].id}`), { method: 'DELETE' });
    },

    // Create a verification token
    createVerificationToken: (token) =>
      fetchData(getUrl('verificationTokens'), {
        method: 'POST',
        body: JSON.stringify(token),
      }),

    // Use a verification token and delete it after use
    useVerificationToken: async ({ identifier, token }) => {
      const tokens = await fetchData(
        getUrl(`verificationTokens?identifier=${identifier}&token=${token}`),
      );

      // If no tokens found, return null
      if (tokens.length === 0) return null;

      // Delete the token after it has been used
      await fetchData(getUrl(`verificationTokens/${tokens[0].id}`), {
        method: 'DELETE',
      });

      return tokens[0];
    },
  };
};

export default JSONServerAdapter;
