'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from 'ui';

export const BackButton = () => {
  const router = useRouter();
  return (
    <Button variant='outline' className='w-24 md:w-[88px]' onClick={() => router.push('/asset')}>
      <div className='flex items-center gap-2 md:gap-1'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='17'
          height='16'
          viewBox='0 0 17 16'
          fill='none'
        >
          <path
            d='M10.5 12L6.5 8L10.5 4'
            stroke='#E3E3E3'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <p>Back</p>
      </div>
    </Button>
  );
};
