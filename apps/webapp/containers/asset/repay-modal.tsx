'use client';
import { useSorobanReact } from '@soroban-react/core';
import { useState } from 'react';
import { Address, ScInt, xdr } from 'soroban-client';
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
import { useValidationResult } from '../../hooks/validation-result';
import { useWriteContract } from '../../hooks/write-contract';
import { Asset } from '../../types/asset';
import { ContractMethods } from '../../types/contract';
import { CONTRACT_ADDRESS } from '../../utils/constants';
import { toBaseUnitAmount } from '../../utils/amount';
import { validateAmount, validateDigitsAfterComma } from '../../utils/validation';

export const RepayModal = ({
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

  const { write } = useWriteContract();

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
        <Button className='w-full md:w-48'>Repay</Button>
      </DialogTrigger>
      <DialogContent className='w-[300px] md:w-[400px]'>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!address || !value) return;
            void (async () => {
              const args = [
                new Address(address).toScVal(),
                xdr.ScVal.scvSymbol(asset.symbol),
                new ScInt(toBaseUnitAmount(value, asset.exponents).toFixed()).toU128(),
              ];
              await write(CONTRACT_ADDRESS, ContractMethods.REPAY, args);
              await refetch();
            })();
          }}
        >
          <DialogHeader>
            <DialogTitle>Repay {asset.symbol}</DialogTitle>
          </DialogHeader>
          <div className='grid gap-6 md:gap-10'>
            <BalanceInput
              balanceTitle='Currently Borrowing'
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
          </div>
          <DialogFooter className='mt-4 '>
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
