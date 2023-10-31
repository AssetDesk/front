'use client';
import { Button, Input, InputProps } from 'ui';
import { Asset } from '../types/asset';
import { formatNumber } from '../utils/format-number';

interface BalanceInputProps {
  balanceTitle: string;
  balance: number;
  asset: Asset;
  handleMax: () => void;
  value: string;
}

export const BalanceInput = ({
  balanceTitle,
  balance,
  asset,
  value,
  handleMax,
  ...props
}: BalanceInputProps & InputProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='relative'>
        <Input
          placeholder='0.0'
          className='z-0 w-full pr-14'
          type='number'
          value={value}
          {...props}
        />
        <div className='absolute bottom-0 right-0 md:-bottom-[1px] md:right-0'>
          <Button
            variant='ghost'
            className='number2 w-10 rounded-lg pr-4 text-[#E3E3E3] md:w-10 md:rounded-lg md:pr-4'
            type='button'
            onClick={handleMax}
          >
            max
          </Button>
        </div>
      </div>
      <div className='flex justify-between'>
        <p className='subtitle3'>{balanceTitle}</p>
        <p className='number2'>
          {formatNumber(balance)} {asset.symbol}
        </p>
      </div>
    </div>
  );
};
