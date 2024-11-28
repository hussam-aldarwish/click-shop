import logo from '@/app/assets/images/logo.png';
import Image from 'next/image';
import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <Image
      src={logo}
      alt='Click Shop'
      className={twMerge('w-10 filter dark:brightness-0 dark:contrast-100 dark:invert', className)}
    />
  );
};

export default Logo;
