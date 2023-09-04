'use client';
import Link from 'next/link';
import { FadeTransition } from '../components';
import { buttonVariants } from 'ui';

export default function NotFound() {
  return (
    <FadeTransition>
      <div className='mt-10 flex flex-col'>
        <h2 className='h1'>Not Found</h2>
        <p className='h2'>Could not find requested resource</p>
        <Link href='/' className={buttonVariants()}>
          Return Home
        </Link>
      </div>
    </FadeTransition>
  );
}
