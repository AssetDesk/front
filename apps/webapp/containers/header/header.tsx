'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from 'ui';
import { routes } from '../../utils';
import { ConnectButton } from './connect-button';

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className='bg-background sticky top-0 z-40 w-full'>
      <div className='flex h-14 items-center justify-between py-[1.25rem] md:h-[5.625rem]'>
        <Link href='/asset' className='relative h-[25px] w-[45px] md:h-[42px] md:w-[70px]'>
          <Image src='/logo.svg' alt='Picture of the author' layout='fill' objectFit='cover' />
        </Link>
        <div className='hidden md:flex md:items-center md:justify-end md:space-x-4'>
          <nav className='flex items-center gap-10'>
            {routes.map(i => (
              <Button key={i.href} variant='ghost' size='sm'>
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
        {pathname === '/' ? (
          <Button onClick={() => router.push('/asset')}>Launch App</Button>
        ) : (
          <ConnectButton />
        )}
      </div>
    </header>
  );
};
