import Link from 'next/link';
import { Button, Social } from 'ui';
import { routes } from '../../utils';

export const Footer = () => {
  return (
    <footer className='mb-8 mt-28 flex items-center justify-between md:mb-16 md:mt-32'>
      <nav className='hidden items-center gap-10 md:flex'>
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
      <Social />
    </footer>
  );
};
