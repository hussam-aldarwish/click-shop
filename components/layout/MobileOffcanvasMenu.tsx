'use client';

import menus from '@/config/menus.json';
import { useSession } from 'next-auth/react';
import { FC } from 'react';
import { BiX } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';
import { ActiveLink } from '../common';
import ThemeToggleButton from '../common/ThemeToggleButton';

interface MobileOffcanvasMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileOffcanvasMenu: FC<MobileOffcanvasMenuProps> = ({ isOpen, onClose }) => {
  const { data: session } = useSession();

  return (
    <div
      className={twMerge(
        'fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity md:hidden duration-300',
        !isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto',
      )}
      onClick={() => onClose()}
    >
      <div
        className={twMerge(
          'fixed inset-y-0 left-0 w-64 bg-background text-foreground z-50 p-4 transition-all flex flex-col gap-2',
          !isOpen ? '-translate-x-full' : 'translate-x-0',
        )}
      >
        <button onClick={() => onClose()} className='mb-4'>
          <BiX size={24} />
        </button>
        <nav>
          {menus['main-nav-menu'].map((menu, index) => (
            <ActiveLink
              key={index}
              href={menu.href}
              exact={menu.exact}
              className='block py-2 px-4 hover:bg-gray-200'
            >
              {menu.label}
            </ActiveLink>
          ))}
        </nav>

        <hr />

        <div>
          {session ? (
            <nav>
              <p className='my-2 font-bold'>{session.user?.name}</p>
              {menus['user-nav-menu'].map((menu, index) => (
                <ActiveLink
                  key={index}
                  href={menu.href}
                  className='block py-2 px-4 hover:bg-gray-200'
                >
                  {menu.label}
                </ActiveLink>
              ))}
            </nav>
          ) : (
            <ActiveLink href='/auth/login' className='block py-2 px-4 hover:bg-gray-200'>
              Login
            </ActiveLink>
          )}
        </div>

        <div className='mt-auto flex justify-center items-center gap-2'>
          Toggle Theme:
          <ThemeToggleButton />
        </div>
      </div>
    </div>
  );
};

export default MobileOffcanvasMenu;
