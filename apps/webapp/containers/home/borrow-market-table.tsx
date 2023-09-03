'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'ui';

export const BorrowMarketTable = () => {
  const router = useRouter();
  const navigateToAsset = () => router.push('/asset/usdc');
  return (
    <>
      <div className='flex flex-col gap-6 md:hidden'>
        <p className='h2'>Borrow Markets</p>
        <div className='flex flex-col gap-4'>
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className='card-gradient flex flex-col gap-4 rounded-lg px-[16px] pb-[26px] pt-[16px]'
            >
              <div className='flex justify-between'>
                <p className='subtitle2 text-[#E3E3E3]'>Assets</p>
                <div className='flex gap-2'>
                  <Image src='/usdc.svg' alt='' width={20} height={20} />
                  <p className='subtitle3 text-[#E3E3E3]'>USDС</p>
                </div>
              </div>
              <div className='flex justify-between'>
                <p className='subtitle2 text-[#E3E3E3]'>APY</p>
                <p className='subtitle3 text-[#E3E3E3]'>2.36%</p>
              </div>
              <div className='flex justify-between'>
                <p className='subtitle2 text-[#E3E3E3]'>Wallet</p>
                <p className='subtitle3 text-[#E3E3E3]'>0 USDC</p>
              </div>
              <div className='flex justify-between'>
                <p className='subtitle2 text-[#E3E3E3]'>Liquidity</p>
                <p className='subtitle3 text-[#E3E3E3]'>$ 7.17M</p>
              </div>
              <Button className='mt-6 w-full' onClick={navigateToAsset}>
                More
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className='card-gradient hidden flex-col gap-2 rounded-lg px-5 pb-6 pt-4 md:flex'>
        <p className='h2'>Borrow Markets</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Assets</TableHead>
              <TableHead className='text-right'>APY</TableHead>
              <TableHead className='text-center'>Wallet</TableHead>
              <TableHead className='text-center'>Liquidity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map(i => (
              <TableRow key={i} className='cursor-pointer' onClick={navigateToAsset}>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Image src='/usdc.svg' alt='' width={20} height={20} />
                    <p>USDС</p>
                  </div>
                </TableCell>
                <TableCell className='text-right'>2.36%</TableCell>
                <TableCell className='text-center'>0 USDC</TableCell>
                <TableCell className='text-center'>$ 7.17M</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
