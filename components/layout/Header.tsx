'use client';

import menus from '@/config/menus.json';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { BiLogInCircle, BiSearch } from 'react-icons/bi';
import { FaBars } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa6';
import { ActiveLink, Logo } from '../common';
import SearchForm from '../forms/SearchForm';
import MobileOffcanvasMenu from './MobileOffcanvasMenu';

const Header = () => {
  const { data: session } = useSession();
  const [searchFormIsOpen, setSearchFormIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Search Form */}
      <SearchForm isOpen={searchFormIsOpen} onClose={() => setSearchFormIsOpen(false)} />

      {/* Mobile Offcanvas Menu */}
      <MobileOffcanvasMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Header */}
      <header className='bg-primary'>
        <div className='container'>
          <div className='flex'>
            {/* Logo */}
            <Link className='flex items-center space-x-4 my-2' href='/'>
              <Logo />
              <h2 className='text-2xl font-bold text-white'>Click Shop</h2>
            </Link>

            {/* Desktop Navigation */}
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

            {/* Search Button */}
            <button
              onClick={() => setSearchFormIsOpen(true)}
              className='ml-auto flex items-center space-x-2 text-white hover:text-gray-200 focus:outline-none'
            >
              <BiSearch size={24} />
              <span>Search</span>
            </button>

            {/* User Dropdown or Login */}
            <div className='my-auto hidden md:block'>
              {session ? (
                <Menu as='div' className='relative ml-4'>
                  <div>
                    <MenuButton className='text-light flex items-center space-x-2'>
                      <FaUser size={32} className='p-1 bg-secondary rounded-full' />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className='absolute right-0 mt-2 z-10 w-48 bg-light text-dark rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                  >
                    <div className='py-1'>
                      {menus['user-nav-menu'].map((menu, index) => (
                        <MenuItem key={index}>
                          <Link href={menu.href} className='block px-4 py-2 hover:bg-gray-100'>
                            {menu.label}
                          </Link>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>
              ) : (
                <Link href='/auth/login' className='text-white hover:text-gray-200 flex ml-4 gap-2'>
                  <BiLogInCircle size={24} />
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button className='md:hidden text-white ml-4' onClick={() => setMobileMenuOpen(true)}>
              <FaBars size={24} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
