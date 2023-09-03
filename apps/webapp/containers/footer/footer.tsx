import React from 'react';
import { routes } from '../../utils';
import Link from 'next/link';
import { Social, buttonVariants } from 'ui';

export const Footer = () => {
  return (
    <footer className='flex items-center justify-between mt-28 md:mt-32 mb-8 md:mb-16'>
      <nav className='hidden md:flex items-center space-x-1'>
        {routes.map(i => (
          <Link
            key={i.href}
            href={i.href}
            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
          >
            {i.title}
          </Link>
        ))}
      </nav>
      <Social />
    </footer>
  );
};
