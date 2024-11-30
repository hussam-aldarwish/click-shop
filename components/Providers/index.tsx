import { FC, PropsWithChildren } from 'react';
import SessionProvider from './SessionProvider';
import ThemeProvider from './ThemeProvider';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
