import { FC, PropsWithChildren } from 'react';

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='flex items-center justify-center bg-light dark:bg-dark py-8 my-auto'>
      <div className='container max-w-md mx-auto p-8 bg-neutral dark:bg-dark rounded-lg shadow-lg'>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
