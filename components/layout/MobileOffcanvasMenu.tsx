'use client';

import menus from '@/config/menus.json';
import { useSession } from 'next-auth/react';
import { FC } from 'react';
import { BiX } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';
import { ActiveLink } from '../common';

interface MobileOffcanvasMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileOffcanvasMenu: FC<MobileOffcanvasMenuProps> = ({ isOpen, onClose }) => {
  const { data: session } = useSession();

  return (
    <div
      className={twMerge(
        'fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity',
        !isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto',
      )}
      onClick={() => onClose()}
    >
      <div
        className={twMerge(
          'fixed inset-y-0 left-0 w-64 bg-white z-50 p-4 transition-all',
          !isOpen ? '-translate-x-full' : 'translate-x-0',
        )}
      >
        <button onClick={() => onClose()} className='text-gray-800 mb-4'>
          <BiX size={24} />
        </button>
        <nav>
          {menus['main-nav-menu'].map((menu, index) => (
            <ActiveLink
              key={index}
              href={menu.href}
              exact={menu.exact}
              className='block py-2 px-4 text-gray-800 hover:bg-gray-200'
            >
              {menu.label}
            </ActiveLink>
          ))}
        </nav>

        <hr className='my-4' />

        <div>
          {session ? (
            <nav>
              <p className='text-gray-800 my-2 font-bold'>{session.user?.name}</p>
              {menus['user-nav-menu'].map((menu, index) => (
                <ActiveLink
                  key={index}
                  href={menu.href}
                  className='block py-2 px-4 text-gray-800 hover:bg-gray-200'
                >
                  {menu.label}
                </ActiveLink>
              ))}
            </nav>
          ) : (
            <ActiveLink
              href='/auth/login'
              className='block py-2 px-4 text-gray-800 hover:bg-gray-200'
            >
              Login
            </ActiveLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileOffcanvasMenu;
