'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ConnectButton } from './connect-button';
import { buttonVariants } from 'ui';
import { routes } from '../../utils';

export const Header = () => {
  return (
    <header className='bg-background sticky top-0 z-40 w-full'>
      <div className='flex h-14 items-center justify-between py-[1.25rem] md:h-[5.625rem]'>
        <Link href='/' className='relative h-[25px] w-[45px] md:h-[42px] md:w-[70px]'>
          <Image src='/logo.svg' alt='Picture of the author' layout='fill' objectFit='cover' />
        </Link>
        <div className='hidden md:flex md:items-center md:justify-end md:space-x-4'>
          <nav className='flex items-center space-x-1'>
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
        </div>
        <ConnectButton />
      </div>
    </header>
  );
};
