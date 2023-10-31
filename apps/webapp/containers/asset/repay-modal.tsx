'use client';
import Image from 'next/image';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'ui';
import { useAssetBySlug } from '../../hooks/asset-by-slug';

export const RepayModal = () => {
  const asset = useAssetBySlug();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='w-full md:w-48'>Repay</Button>
      </DialogTrigger>
      <DialogContent className='w-[300px] md:w-[400px]'>
        <DialogHeader>
          <DialogTitle>Repay {asset?.symbol}</DialogTitle>
        </DialogHeader>
        <div className='grid gap-6 md:gap-10'>
          {/* <BalanceInput balanceTitle='Wallet Balance' /> */}
          <div className='flex flex-col gap-2 md:gap-4'>
            <p className='subtitle2'>Borrow Rates</p>
            <div className='flex flex-col'>
              <div className='flex justify-between border-b-[1px] border-[#0344E9] p-[10px]'>
                <div className='flex gap-2'>
                  <Image src={asset?.icon ?? ''} alt='' width={20} height={20} />
                  <p className='subtitle3'>Borrow APY</p>
                </div>
                <p className='number2'>0.04%</p>
              </div>
              <div className='flex justify-between border-b-[1px] border-[#0344E9] p-[10px]'>
                <div className='flex gap-2'>
                  {/* TODO is nedeed? */}
                  {/* <Image src={token?.icon ?? ''} alt='' width={20} height={20} /> */}
                  <p className='subtitle3'>Distribution APY</p>
                </div>
                <p className='number2'>0%</p>
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
