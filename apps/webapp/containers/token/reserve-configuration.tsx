import React from 'react';
import { SupplyInfo } from './supply-info';
import { BorrowInfo } from './borrow-info';
import { InterestRateModel } from './interest-rate-model';

export const ReserveConfiguration = () => {
  return (
    <div className='flex flex-col gap-[18px]'>
      <p className='h2'>Reserve status & configuration</p>
      <div className='card-gradient flex flex-col gap-10 rounded-lg px-4 pb-24 pt-4 md:gap-14 md:px-[30px] md:pb-[72px] md:pt-5'>
        <SupplyInfo />
        <BorrowInfo />
        <InterestRateModel />
      </div>
    </div>
  );
};
