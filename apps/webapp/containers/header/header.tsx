'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from 'ui';
import { routes, routesLinks } from '../../utils';
import { ConnectButton } from './connect-button';
import { cn } from 'ui/lib/utils';
import { MobileNavbar } from './mobile-navbar';

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const currentLink = pathname.match(/^\/([^/]*)/)?.[0];

  return (
    <header className='bg-background sticky top-0 z-40 w-full'>
      <div className='flex h-14 items-center justify-between py-[1.25rem] md:h-[5.625rem]'>
        <Link
          href={routesLinks.Markets}
          className='relative h-[25px] w-[45px] md:h-[42px] md:w-[70px]'
        >
          <Image src='/logo.svg' alt='Picture of the author' layout='fill' objectFit='cover' />
        </Link>
        <div className='hidden md:flex md:items-center md:justify-end md:space-x-4'>
          <nav className='flex items-center'>
            {routes.map(i => (
              <Button
                key={i.href}
                variant='ghost'
                size='md'
                className={cn(
                  'justify-start px-5',
                  currentLink === i.href && 'rounded-none border-b-2  border-[#0344E9]',
                )}
              >
                <Link
                  key={i.href}
                  href={i.href}
                  target={i.isLink ? '_blank' : undefined}
                  rel={i.isLink ? 'noreferrer noopener' : undefined}
                >
                  {i.title}
                </Link>
              </Button>
            ))}
          </nav>
        </div>
        <div className='flex items-center'>
          {pathname === '/' ? (
            <Button
              onClick={() => router.push(routesLinks.Markets)}
              className='w-[152px] md:w-[192px]'
            >
              Launch App
            </Button>
          ) : (
            <ConnectButton />
          )}
          <MobileNavbar />
        </div>
      </div>
    </header>
  );
};
