'use client';
import React, { useMemo } from 'react';
import { SupplyModal } from './supply-modal';
import { BorrowModal } from './borrow-modal';
import { WithdrawModal } from './withdraw-modal';
import { RepayModal } from './repay-modal';
import { FadeTransition } from '../../components';
import { useParams } from 'next/navigation';
import { tokens } from '../../utils';

export const UserInfo = () => {
  const { slug } = useParams() as { slug: string };

  const token = useMemo(() => {
    return tokens.find(i => i.id === slug);
  }, [slug]);
  return (
    <FadeTransition>
      <div className='flex flex-col gap-[18px]'>
        <p className='h2'>Your info</p>
        <div className='card-gradient flex flex-col rounded-lg px-4 pb-10 pt-4  md:px-[30px] md:pb-14 md:pt-5'>
          <div className='flex items-center gap-4 border-b-[1px] border-[rgba(8,46,143,0.50)] pb-4 md:pb-6 '>
            {/* TODO: replace wallet icon */}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-[30px] w-[30px] md:h-10 md:w-10'
              viewBox='0 0 30 30'
              fill='none'
            >
              <path
                d='M19.375 19.375C20.4125 19.375 21.25 18.5375 21.25 17.5C21.25 16.4625 20.4125 15.625 19.375 15.625C18.3375 15.625 17.5 16.4625 17.5 17.5C17.5 18.5375 18.3375 19.375 19.375 19.375ZM8.75 3.75H21.25C22.6375 3.75 23.75 4.875 23.75 6.25V8.75C25.1375 8.75 26.25 9.875 26.25 11.25V23.75C26.25 25.1375 25.1375 26.25 23.75 26.25H8.75C5.9875 26.25 3.75 24.0125 3.75 21.25V8.75C3.75 5.9875 5.9875 3.75 8.75 3.75ZM21.25 8.75V6.25H8.75C7.375 6.25 6.25 7.375 6.25 8.75V9.425C6.9875 9 7.8375 8.75 8.75 8.75H21.25ZM6.25 21.25C6.25 22.6375 7.375 23.75 8.75 23.75H23.75V11.25H8.75C7.375 11.25 6.25 12.375 6.25 13.75V21.25Z'
                fill='#E3E3E3'
              />
            </svg>
            <div className='flex flex-col gap-2'>
              <p className='subtitle1'>Wallet balance</p>
              <p className='number2'>0 {token?.token}</p>
            </div>
          </div>
          {/* // user detail */}
          <div className='mt-6 flex flex-col gap-6 md:gap-6'>
            <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
              <div className='flex flex-col gap-1 border-l-[1px] border-[#0344E9] pl-4'>
                <div className='flex items-center gap-2'>
                  <p className='subtitle2 text-[#E3E3E3]'>Available to supply</p>
                  {/* Info Icon replace */}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='none'
                  >
                    <path
                      d='M7.3335 6.00001H8.66683V4.66668H7.3335M8.00016 13.3333C5.06016 13.3333 2.66683 10.94 2.66683 8.00001C2.66683 5.06001 5.06016 2.66668 8.00016 2.66668C10.9402 2.66668 13.3335 5.06001 13.3335 8.00001C13.3335 10.94 10.9402 13.3333 8.00016 13.3333ZM8.00016 1.33334C7.12468 1.33334 6.25778 1.50578 5.44894 1.84081C4.6401 2.17584 3.90517 2.66691 3.28612 3.28596C2.03588 4.53621 1.3335 6.2319 1.3335 8.00001C1.3335 9.76812 2.03588 11.4638 3.28612 12.7141C3.90517 13.3331 4.6401 13.8242 5.44894 14.1592C6.25778 14.4942 7.12468 14.6667 8.00016 14.6667C9.76827 14.6667 11.464 13.9643 12.7142 12.7141C13.9645 11.4638 14.6668 9.76812 14.6668 8.00001C14.6668 7.12453 14.4944 6.25762 14.1594 5.44879C13.8243 4.63995 13.3333 3.90502 12.7142 3.28596C12.0952 2.66691 11.3602 2.17584 10.5514 1.84081C9.74255 1.50578 8.87564 1.33334 8.00016 1.33334ZM7.3335 11.3333H8.66683V7.33334H7.3335V11.3333Z'
                      fill='#B0A8A8'
                    />
                  </svg>
                </div>
                <p className='number mt-1'>760.00 {token?.token}</p>
                <p className='number2'>$760.00</p>
              </div>
              <SupplyModal />
            </div>
            <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
              <div className='flex flex-col gap-1 border-l-[1px] border-[#0344E9] pl-4'>
                <div className='flex items-center gap-2'>
                  <p className='subtitle2 text-[#E3E3E3]'>Available to borrow</p>
                  {/* Info Icon replace */}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='none'
                  >
                    <path
                      d='M7.3335 6.00001H8.66683V4.66668H7.3335M8.00016 13.3333C5.06016 13.3333 2.66683 10.94 2.66683 8.00001C2.66683 5.06001 5.06016 2.66668 8.00016 2.66668C10.9402 2.66668 13.3335 5.06001 13.3335 8.00001C13.3335 10.94 10.9402 13.3333 8.00016 13.3333ZM8.00016 1.33334C7.12468 1.33334 6.25778 1.50578 5.44894 1.84081C4.6401 2.17584 3.90517 2.66691 3.28612 3.28596C2.03588 4.53621 1.3335 6.2319 1.3335 8.00001C1.3335 9.76812 2.03588 11.4638 3.28612 12.7141C3.90517 13.3331 4.6401 13.8242 5.44894 14.1592C6.25778 14.4942 7.12468 14.6667 8.00016 14.6667C9.76827 14.6667 11.464 13.9643 12.7142 12.7141C13.9645 11.4638 14.6668 9.76812 14.6668 8.00001C14.6668 7.12453 14.4944 6.25762 14.1594 5.44879C13.8243 4.63995 13.3333 3.90502 12.7142 3.28596C12.0952 2.66691 11.3602 2.17584 10.5514 1.84081C9.74255 1.50578 8.87564 1.33334 8.00016 1.33334ZM7.3335 11.3333H8.66683V7.33334H7.3335V11.3333Z'
                      fill='#B0A8A8'
                    />
                  </svg>
                </div>
                <p className='number mt-1'>760.00 {token?.token}</p>
                <p className='number2'>$760.00</p>
              </div>
              <BorrowModal />
            </div>
            <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
              <div className='flex flex-col gap-1 border-l-[1px] border-[#0344E9] pl-4'>
                <div className='flex items-center gap-2'>
                  <p className='subtitle2 text-[#E3E3E3]'>Available to withdraw</p>
                  {/* Info Icon replace */}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='none'
                  >
                    <path
                      d='M7.3335 6.00001H8.66683V4.66668H7.3335M8.00016 13.3333C5.06016 13.3333 2.66683 10.94 2.66683 8.00001C2.66683 5.06001 5.06016 2.66668 8.00016 2.66668C10.9402 2.66668 13.3335 5.06001 13.3335 8.00001C13.3335 10.94 10.9402 13.3333 8.00016 13.3333ZM8.00016 1.33334C7.12468 1.33334 6.25778 1.50578 5.44894 1.84081C4.6401 2.17584 3.90517 2.66691 3.28612 3.28596C2.03588 4.53621 1.3335 6.2319 1.3335 8.00001C1.3335 9.76812 2.03588 11.4638 3.28612 12.7141C3.90517 13.3331 4.6401 13.8242 5.44894 14.1592C6.25778 14.4942 7.12468 14.6667 8.00016 14.6667C9.76827 14.6667 11.464 13.9643 12.7142 12.7141C13.9645 11.4638 14.6668 9.76812 14.6668 8.00001C14.6668 7.12453 14.4944 6.25762 14.1594 5.44879C13.8243 4.63995 13.3333 3.90502 12.7142 3.28596C12.0952 2.66691 11.3602 2.17584 10.5514 1.84081C9.74255 1.50578 8.87564 1.33334 8.00016 1.33334ZM7.3335 11.3333H8.66683V7.33334H7.3335V11.3333Z'
                      fill='#B0A8A8'
                    />
                  </svg>
                </div>
                <p className='number mt-1'>760.00 {token?.token}</p>
                <p className='number2'>$760.00</p>
              </div>
              <WithdrawModal />
            </div>
            <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
              <div className='flex flex-col gap-1 border-l-[1px] border-[#0344E9] pl-4'>
                <div className='flex items-center gap-2'>
                  <p className='subtitle2 text-[#E3E3E3]'>Available to repay</p>
                  {/* Info Icon replace */}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='none'
                  >
                    <path
                      d='M7.3335 6.00001H8.66683V4.66668H7.3335M8.00016 13.3333C5.06016 13.3333 2.66683 10.94 2.66683 8.00001C2.66683 5.06001 5.06016 2.66668 8.00016 2.66668C10.9402 2.66668 13.3335 5.06001 13.3335 8.00001C13.3335 10.94 10.9402 13.3333 8.00016 13.3333ZM8.00016 1.33334C7.12468 1.33334 6.25778 1.50578 5.44894 1.84081C4.6401 2.17584 3.90517 2.66691 3.28612 3.28596C2.03588 4.53621 1.3335 6.2319 1.3335 8.00001C1.3335 9.76812 2.03588 11.4638 3.28612 12.7141C3.90517 13.3331 4.6401 13.8242 5.44894 14.1592C6.25778 14.4942 7.12468 14.6667 8.00016 14.6667C9.76827 14.6667 11.464 13.9643 12.7142 12.7141C13.9645 11.4638 14.6668 9.76812 14.6668 8.00001C14.6668 7.12453 14.4944 6.25762 14.1594 5.44879C13.8243 4.63995 13.3333 3.90502 12.7142 3.28596C12.0952 2.66691 11.3602 2.17584 10.5514 1.84081C9.74255 1.50578 8.87564 1.33334 8.00016 1.33334ZM7.3335 11.3333H8.66683V7.33334H7.3335V11.3333Z'
                      fill='#B0A8A8'
                    />
                  </svg>
                </div>
                <p className='number mt-1'>760.00 {token?.token}</p>
                <p className='number2'>$760.00</p>
              </div>
              <RepayModal />
            </div>
          </div>
        </div>
      </div>
    </FadeTransition>
  );
};
