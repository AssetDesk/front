import Image from 'next/image';
import React from 'react';

export const AssetDashboard = () => {
  return (
    <div className='card-gradient grid grid-cols-2 gap-4 rounded-lg px-4 pb-5 pt-4 md:grid-cols-6 md:gap-6 md:p-[30px]'>
      <div
        className='grid-row-2 grid gap-1 md:text-center'
      >
        <p className='subtitle2 color-[#E3E3E3]'>Total Earning</p>
        <p className='number'>$521.26M</p>
      </div>
      <div
        className='grid-row-2 grid gap-1
       md:text-center'
      >
        <p className='subtitle2 color-[#E3E3E3]'>Collateral Factor</p>
        <p className='number'>82.50%</p>
      </div>
      <div
        className='grid-row-2 grid gap-1
       md:text-center'
      >
        <p className='subtitle2 color-[#E3E3E3]'>Total Borrowing</p>
        <p className='number'>$521.26M</p>
      </div>
      <div
        className='grid-row-2 grid gap-1 md:text-center
      '
      >
        <p className='subtitle2 color-[#E3E3E3]'>Earn Distribution</p>
        <div className='flex items-center md:justify-center gap-2'>
          <Image src='/usdc.svg' alt='' width={20} height={20} />
          <p className='number'>0.00%</p>
        </div>
      </div>
      <div
        className='grid-row-2 grid gap-1 md:text-center
      '
      >
        <p className='subtitle2 color-[#E3E3E3]'>Borrow Distribution</p>
        <div className='flex items-center md:justify-center gap-2'>
          <Image src='/usdc.svg' alt='' width={20} height={20} />
          <p className='number'>2.67%</p>
        </div>
      </div>
      <div
        className='grid-row-2 grid gap-1 md:text-center
      '
      >
        <p className='subtitle2 color-[#E3E3E3]'>Oracle Price</p>
        <p className='number'>$1,931.49</p>
      </div>
      <div
        className='grid-row-2 grid gap-1 md:text-center
      '
      >
        <p className='subtitle2 color-[#E3E3E3]'>Earn APR</p>
        <div className='flex items-center md:justify-center gap-2'>
          <Image src='/usdc.svg' alt='' width={20} height={20} />
          <p className='number'>0.07%</p>
        </div>
      </div>
      <div
        className='grid-row-2 grid gap-1 md:text-center
      '
      >
        <p className='subtitle2 color-[#E3E3E3]'>Borrow APR</p>
        <div className='flex items-center md:justify-center gap-2'>
          <Image src='/usdc.svg' alt='' width={20} height={20} />
          <p className='number'>2.67%</p>
        </div>
      </div>
      <div
        className='grid-row-2 grid gap-1 md:text-center
      '
      >
        <p className='subtitle2 color-[#E3E3E3]'>Reserve Factor</p>
        <p className='number'>20.00%</p>
      </div>
      <div
        className='grid-row-2 grid gap-1 md:text-center
      '
      >
        <p className='subtitle2 color-[#E3E3E3]'>Borrow Cap</p>
        <p className='number'>$193.15M</p>
      </div>
      <div
        className='grid-row-2 grid gap-1 md:text-center
      '
      >
        <p className='subtitle2 color-[#E3E3E3]'>Reserves</p>
        <p className='number'>$1.56M</p>
      </div>
      <div
        className='grid-row-2 grid gap-1 md:text-center
      '
      >
        <p className='subtitle2 color-[#E3E3E3]'>APY</p>
        <p className='number'>1.20%</p>
      </div>
    </div>
  );
};
