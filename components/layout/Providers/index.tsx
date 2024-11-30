import { FC, PropsWithChildren } from 'react';
import SessionProvider from './SessionProvider';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;
