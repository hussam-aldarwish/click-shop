'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { AnchorHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>, LinkProps {
  activeClassName?: string;
  exact?: boolean;
}

const ActiveLink = forwardRef<HTMLAnchorElement, Props>(
  ({ href, className, activeClassName = 'active', children, exact = false, ...props }, ref) => {
    const pathname = usePathname();

    const hrefPathname = typeof href === 'string' ? href : href.pathname || '';
    const isActive = exact ? pathname === hrefPathname : pathname?.startsWith(hrefPathname);

    return (
      <Link
        ref={ref}
        {...props}
        href={href}
        className={twMerge(className, isActive ? activeClassName : '')}
      >
        {children}
      </Link>
    );
  },
);

ActiveLink.displayName = 'ActiveLink';

export default ActiveLink;
