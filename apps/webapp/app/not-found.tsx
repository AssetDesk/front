import Link from 'next/link';
import { buttonVariants } from 'ui';
import { FadeTransition } from '../components';
import { Metadata } from 'next';
import { generalMetadata } from '../utils';

export const metadata: Metadata = {
  title: 'AssetDesk',
  ...generalMetadata,
};

export default function NotFound() {
  return (
    <div className='flex h-full w-[100vw] items-center justify-center'>
      <FadeTransition>
        <div className='mt-10 flex flex-col items-center justify-center gap-2'>
          <h2 className='h1'>Not Found</h2>
          <p className='h2'>Could not find requested resource</p>
          <Link href='/' className={buttonVariants()}>
            Return Home
          </Link>
        </div>
      </FadeTransition>
    </div>
  );
}
