import { auth } from '@/auth';
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { FC, PropsWithChildren } from 'react';

const SessionProvider: FC<PropsWithChildren> = async ({ children }) => {
  const session = await auth();
  return <NextAuthSessionProvider session={session}>{children}</NextAuthSessionProvider>;
};

export default SessionProvider;
