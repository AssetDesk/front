import { Button, Dialog, DialogContent, DialogTrigger } from 'ui';

import { routes } from '../../utils';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from 'ui/lib/utils';

export const MobileNavbar = () => {
  const pathname = usePathname();
  const currentLink = pathname?.match(/^\/([^\/]*)/)?.[0];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Menu size={20} className='ml-9 md:hidden' />
      </DialogTrigger>
      <DialogContent className='data-[state=open]:slide-in-from-top-3 data-[state=closed]:slide-out-to-top-3 data-[state=closed]:slide-out-to-right-3 data-[state=open]:slide-in-from-right-3 left-auto right-3 top-3 w-[296px] translate-x-0 translate-y-0'>
        <nav className='overflow-0 mt-7 flex flex-col gap-1 p-3'>
          {routes.map(i => (
            <DialogTrigger asChild key={i?.href}>
              <Link
                key={i.href}
                href={i.href}
                target={i.isLink ? '_blank' : undefined}
                rel={i.isLink ? 'noreferrer noopener' : undefined}
              >
                <Button
                  key={i.href}
                  variant='ghost'
                  size='md'
                  className={cn(
                    'justify-start px-2.5 py-3 focus-visible:ring-offset-[0]',
                    currentLink === i.href && 'rounded-none border-l-2  border-[#0344E9]',
                  )}
                >
                  {i.title}
                </Button>
              </Link>
            </DialogTrigger>
          ))}
        </nav>
      </DialogContent>
    </Dialog>
  );
};
