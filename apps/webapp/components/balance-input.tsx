'use client';
import { Button, Input } from 'ui';
import { useAssetBySlug } from '../hooks/asset-by-slug';

interface BalanceInputProps {
  balanceTitle: string;
}

export const BalanceInput = ({ balanceTitle }: BalanceInputProps) => {
  const asset = useAssetBySlug();

  return (
    <div className='flex flex-col gap-2'>
      <div className='relative'>
        <Input placeholder='0.0' className='z-0 w-full pr-14' />
        <div className='absolute bottom-0 right-0 md:-bottom-[1px] md:right-0'>
          <Button
            variant='ghost'
            className='number2 w-10 rounded-lg pr-4 text-[#E3E3E3] md:w-10 md:rounded-lg md:pr-4'
            onClick={() => console.log('asd')}
          >
            max
          </Button>
        </div>
      </div>
      <div className='flex justify-between'>
        <p className='subtitle3'>{balanceTitle}</p>
        <p className='number2'>0 {asset?.symbol}</p>
      </div>
    </div>
  );
};
