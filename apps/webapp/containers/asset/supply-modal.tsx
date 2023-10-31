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
import { BalanceInput } from '../../components';
import { Asset } from '../../types/asset';
import { useWriteContract } from '../../hooks/write-contract';
import { CONTRACT_ADDRESS } from '../../utils/addresses';
import { ContractMethods } from '../../types/contract';
import { useMemo, useState } from 'react';
import { Address, ScInt, xdr } from 'soroban-client';
import { useSorobanReact } from '@soroban-react/core';
import { validateAmount, validateDigitsAfterComma } from '../../utils/validation';
import { useValidationResult } from '../../hooks/validation-result';
import { formatValueToBigNumber } from '../../utils/format-value';

export const SupplyModal = ({
  balance,
  asset,
  refetch,
}: {
  balance: number;
  asset: Asset;
  refetch: () => Promise<void>;
}) => {
  const { address } = useSorobanReact();
  const [value, setValue] = useState('');

  const args = useMemo(() => {
    if (!address || !value) return [];

    return [
      new Address(address).toScVal(),
      xdr.ScVal.scvSymbol(asset.symbol),
      new ScInt(formatValueToBigNumber(value, asset.exponents).toNumber()).toU128(),
    ];
  }, [address, asset, value]);

  const { write } = useWriteContract(CONTRACT_ADDRESS, ContractMethods.DEPOSIT, args);

  const validationResult = useValidationResult(
    [
      {
        type: 'error',
        issue: 'insufficient funds',
        checkFn: (amount: string) => validateAmount(amount, balance),
      },
    ],
    value,
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='w-full md:w-48'>Supply</Button>
      </DialogTrigger>
      <DialogContent className='w-[300px] md:w-[400px]'>
        <form
          onSubmit={e => {
            e.preventDefault();
            void (async () => {
              await write();
              await refetch();
            })();
          }}
        >
          <DialogHeader>
            <DialogTitle>Supply {asset.symbol}</DialogTitle>
          </DialogHeader>
          <div className='mt-2 grid gap-6 md:gap-10'>
            <BalanceInput
              balanceTitle='Wallet Balance'
              asset={asset}
              balance={balance}
              value={value}
              variant={validationResult?.type ?? 'default'}
              handleMax={() => setValue(String(balance))}
              onChange={e => {
                if (
                  Number(e.target.value) < 0 ||
                  validateDigitsAfterComma(e.target.value, asset.exponents)
                )
                  return;
                setValue(e.target.value);
              }}
            />
            <div className='flex flex-col gap-2 md:gap-4'>
              <p className='subtitle2'>Supply Rates</p>
              <div className='flex flex-col'>
                <div className='flex justify-between border-b-[1px] border-[#0344E9] p-[10px]'>
                  <div className='flex gap-2'>
                    <Image src={asset.icon} alt='' width={20} height={20} />
                    <p className='subtitle3'>Supply APY</p>
                  </div>
                  <p className='number2'>0.04%</p>
                </div>
                <div className='flex justify-between border-b-[1px] border-[#0344E9] p-[10px]'>
                  <div className='flex gap-2'>
                    <p className='subtitle3'>Distribution APY</p>
                  </div>
                  <p className='number2'>0%</p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className='mt-4'>
            <Button
              type='submit'
              className='w-full md:w-full'
              disabled={Boolean(validationResult?.issue) || !value}
            >
              {validationResult?.issue ?? 'Confirm'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
