import Link from 'next/link';
import { buttonVariants } from 'ui';
import { Metadata } from 'next';
import { generalMetadata } from '../utils';

export const metadata: Metadata = {
  title: 'AssetDesk',
  ...generalMetadata,
};

export default function NotFound() {
  return (
    <div className='mt-10 flex h-[calc(100vh-600px)] flex-col items-center justify-center gap-2'>
      <h2 className='h1'>Not Found</h2>
      <p className='h2'>Could not find requested resource</p>
      <Link href='/' className={buttonVariants()}>
        Return Home
      </Link>
    </div>
  );
}
