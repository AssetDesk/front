'use client';
import React from 'react';
import { ConnectorsModal } from '../header/connectors-modal';
import Image from 'next/image';

export const UserNotConnected = () => {
  return (
    <div className='flex flex-col gap-[18px]'>
      <p className='h2'>Your info</p>
      <div className='card-gradient flex flex-col items-center justify-center rounded-lg px-4 pb-10 pt-4  md:px-[30px] md:pb-20 md:pt-14'>
        <Image
          src='/user-not-connected.svg'
          alt='user not connected img'
          width={167}
          height={167}
        />
        <p className='subtitle1 mb-2 mt-4 text-center'>Please, connect your wallet</p>
        <p className='subtitle2 mb-6 text-center text-[#B0A8A8]'>
          Please connect your wallet to see your depositing and borrowings.
        </p>
        <ConnectorsModal />
      </div>
    </div>
  );
};
