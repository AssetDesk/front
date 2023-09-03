import React from 'react';
import { Progress } from 'ui';

// border-radius: 8px;
// background: linear-gradient(180deg, #010B22 0.28%, rgba(31, 71, 173, 0.20) 166.34%);
export const Balances = () => {
  return (
    <div className='flex flex-col card-gradient rounded-[8px] pt-[40px] md:pt-[16px] pb-[48px] md:pb-[16px] px-[16px] md:px-[20px] '>
      <div className='flex flex-col md:flex-row md:items-center md:justify-around mb-7 md:mb-4'>
        <div className='w-[186px] h-[186px] rounded-full border-4 border-[#0344E9] flex flex-col items-center justify-center gap-y-[0.25rem] md:gap-y-2 self-center order-1 md:order-2 mb-7 md:mb-4'>
          <p className='h2'>TVL</p>
          <p className='title'>$0</p>
        </div>
        <div className='flex flex-row md:flex-col justify-between items-center order-2 md:order-1 md:gap-4'>
          <p className='h2 md:text-[#0344E9]'>Supply Balance</p>
          <p className='title'>$0</p>
        </div>
        <div className='flex flex-row md:flex-col justify-between items-center order-3 md:gap-4'>
          <p className='h2 md:text-[#0344E9]'>Borrow Balance</p>
          <p className='title'>$0</p>
        </div>
      </div>
      <div className='flex flex-col md:items-center justify-between md:flex-row gap-4'>
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
