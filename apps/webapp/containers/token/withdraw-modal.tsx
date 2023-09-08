'use client';
import React, { useMemo } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'ui';
import { BalanceInput } from '../../components';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { tokens } from '../../utils';

export const WithdrawModal = () => {
  const { slug } = useParams() as { slug: string };

  const token = useMemo(() => {
    return tokens.find(i => i.id === slug);
  }, [slug]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='w-full md:w-48'>Withdraw</Button>
      </DialogTrigger>
      <DialogContent className='w-[300px] md:w-[400px]'>
        <DialogHeader>
          <DialogTitle>Withdraw {token?.token}</DialogTitle>
        </DialogHeader>
        <div className='grid gap-6 md:gap-10'>
          <BalanceInput balanceTitle='Currently Supplying' />
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-2 md:gap-4'>
              <p className='subtitle2'>Supply Rates</p>
              <div className='flex flex-col'>
                <div className='flex justify-between border-b-[1px] border-[#0344E9] p-[10px]'>
                  <div className='flex gap-2'>
                    {/* TODO is nedeed? */}
                    <Image src={token?.icon ?? ''} alt='' width={20} height={20} />
                    <p className='subtitle3'>Supply APY</p>
                  </div>
                  <p className='number2'>0.04%</p>
                </div>
                <div className='flex justify-between border-b-[1px] border-[#0344E9] p-[10px]'>
                  <div className='flex gap-2'>
                    {/* <Image src={token?.icon ?? ''} alt='' width={20} height={20} /> */}
                    <p className='subtitle3'>Distribution APY</p>
                  </div>
                  <p className='number2'>0%</p>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2 md:gap-4'>
              <p className='subtitle2'>Borrow Limit</p>
              <div className='flex flex-col'>
                <div className='flex justify-between border-b-[1px] border-[#0344E9] p-[10px]'>
                  <p className='subtitle3'>Borrow Limit</p>
                  <p className='number2'>$0.00</p>
                </div>
                <div className='flex justify-between border-b-[1px] border-[#0344E9] p-[10px]'>
                  <p className='subtitle3'>Borrow Limit Used</p>
                  <p className='number2'>0%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className='mt-4 '>
          <Button type='submit' className='w-full md:w-full'>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
