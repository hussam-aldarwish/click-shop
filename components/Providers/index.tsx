import { auth } from '@/auth';
import { FC, PropsWithChildren } from 'react';
import QueryClientProvider from './QueryClientProvider';
import SessionProvider from './SessionProvider';
import ShoppingCartProvider from './ShoppingCartProvider';
import ThemeProvider from './ThemeProvider';

const Providers: FC<PropsWithChildren> = async ({ children }) => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <QueryClientProvider>
        <ThemeProvider>
          <ShoppingCartProvider>{children}</ShoppingCartProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
