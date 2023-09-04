'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button, Social } from 'ui';

export const Hero = () => {
  const router = useRouter();
  return (
    <div className='flex w-full flex-col gap-2 md:w-[50%]'>
      <p className='h1'>AssetsDesk is </p>
      <p className='subtitle1 border-gradient border-l-[4px] px-4 py-[10px] md:px-6'>
        Earn interest, borrow assets, and build applications.Earn interest, borrow assets, and build
        applications.Earn interest, borrow assets, and build{' '}
      </p>
      <Social />
      <div className='mt-2 flex gap-4 md:mt-4 md:gap-6'>
        <Button onClick={() => router.push('/asset')}>Launch App</Button>
        <Button variant='outline'>Read More</Button>
      </div>
    </div>
  );
};
