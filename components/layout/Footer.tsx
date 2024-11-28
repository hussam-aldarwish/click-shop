import menus from '@/config/menus.json';
import { ActiveLink } from '../common';

const Footer = () => {
  return (
    <footer className='bg-dark text-light py-4'>
      <div className='container'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='text-center md:text-left'>
            <p className='font-poppins text-light'>
              © {new Date().getFullYear()} Click Shop. All rights reserved.
            </p>
          </div>
          <div className='mt-2 md:mt-0'>
            <ul className='flex justify-center md:justify-end space-x-4'>
              {menus['footer-nav-menu'].map((menu, index) => (
                <li key={index}>
                  <ActiveLink
                    href={menu.href}
                    className='text-secondary hover:text-light transition-all duration-300'
                  >
                    {menu.label}
                  </ActiveLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
