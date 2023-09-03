import React from 'react';
import { Progress } from 'ui';

// border-radius: 8px;
// background: linear-gradient(180deg, #010B22 0.28%, rgba(31, 71, 173, 0.20) 166.34%);
export const Balances = () => {
  return (
    <div className='card-gradient flex flex-col rounded-lg px-[16px] pb-[48px] pt-[40px] md:px-[20px] md:pb-[16px] md:pt-[16px] '>
      <div className='mb-7 flex flex-col md:mb-4 md:flex-row md:items-center md:justify-around'>
        <div className='order-1 mb-7 flex h-[186px] w-[186px] flex-col items-center justify-center gap-y-[0.25rem] self-center rounded-full border-4 border-[#0344E9] md:order-2 md:mb-4 md:gap-y-2'>
          <p className='h2'>TVL</p>
          <p className='title'>$0</p>
        </div>
        <div className='order-2 flex flex-row items-center justify-between md:order-1 md:flex-col md:gap-4'>
          <p className='h2 md:text-[#0344E9]'>Supply Balance</p>
          <p className='title'>$0</p>
        </div>
        <div className='order-3 flex flex-row items-center justify-between md:flex-col md:gap-4'>
          <p className='h2 md:text-[#0344E9]'>Borrow Balance</p>
          <p className='title'>$0</p>
        </div>
      </div>
      <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
        <p className='subtitle2 text-[#0344E9] md:text-[#FFFFFF]'>Borrow limit</p>
        <div className='flex flex-1 items-center gap-3 md:gap-4'>
          <p className='number2 text-[#E3E3E3]'>0$</p>
          <Progress value={22} />
          <p className='number2 text-[#E3E3E3]'>0$</p>
        </div>
      </div>
    </div>
  );
};
