import React from 'react';
import { routes } from '../../utils';
import Link from 'next/link';
import { Social, buttonVariants } from 'ui';

export const Footer = () => {
  return (
    <footer className='mb-8 mt-28 flex items-center justify-between md:mb-16 md:mt-32'>
      <nav className='hidden items-center space-x-1 md:flex'>
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
