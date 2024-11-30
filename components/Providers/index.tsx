import { FC, PropsWithChildren } from 'react';
import SessionProvider from './SessionProvider';
import ShoppingCartProvider from './ShoppingCartProvider';
import ThemeProvider from './ThemeProvider';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <ThemeProvider>
        <ShoppingCartProvider>{children}</ShoppingCartProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
