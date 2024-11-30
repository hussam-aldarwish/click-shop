'use client';

import menus from '@/config/menus.json';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { ActiveLink, Logo } from '../common';
import SearchForm from './SearchForm';

const Header = () => {
  const { data: session } = useSession();
  const [searchFormIsOpen, setSearchFormIsOpen] = useState(false);

  return (
    <>
      <SearchForm isOpen={searchFormIsOpen} onClose={() => setSearchFormIsOpen(false)} />
      <header className='bg-primary'>
        <div className='container'>
          <div className='flex'>
            {/* Logo */}
            <Link className='flex items-center space-x-4 my-2' href='/'>
              <Logo />
              <h2 className='text-2xl font-bold text-white'>Click Shop</h2>
            </Link>

            {/* Navigation */}
            <nav className='space-x-4 ml-10 hidden md:flex'>
              {menus['main-nav-menu'].map((menu, index) => (
                <ActiveLink
                  key={index}
                  href={menu.href}
                  exact={menu.exact}
                  className='border-4 border-transparent hover:border-b-secondary dark:hover:border-b-light flex items-center transition-all duration-300'
                  activeClassName='border-b-secondary dark:border-b-light'
                >
                  {menu.label}
                </ActiveLink>
              ))}
            </nav>

            {/* Search */}
            <button
              onClick={() => setSearchFormIsOpen(true)}
              className='ml-auto flex items-center space-x-2 text-white hover:text-gray-200 focus:outline-none'
            >
              <FaSearch size={20} />
              <span>Search</span>
            </button>

            {/* User */}
            <div className='ml-4 flex items-center space-x-4'>
              {session ? (
                <Link href='/user' className='text-white hover:text-gray-200'>
                  Profile
                </Link>
              ) : (
                <Link href='/auth/login' className='text-white hover:text-gray-200'>
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
