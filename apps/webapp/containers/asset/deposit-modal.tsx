'use client';
import { useSorobanReact } from '@soroban-react/core';
import BigNumber from 'bignumber.js';
import Image from 'next/image';
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
import { displayAmount, fromBaseUnitAmount, toBaseUnitAmount } from '../../utils/amount';
import { CONTRACT_ADDRESS, EIGHTEEN_EXPONENT } from '../../utils/constants';
import { validateAmount, validateDigitsAfterComma } from '../../utils/validation';
import { StatusModal } from './status-modal';

export const DepositModal = ({
  balance,
  asset,
  apy,
  refetch,
}: {
  balance: number;
  asset: Asset;
  apy: BigNumber;
  refetch: () => Promise<void>;
}) => {
  const { address } = useSorobanReact();
  const [value, setValue] = useState('');

  const { write, isSuccess, isLoading, isError, setSuccess, setIsError } = useWriteContract();

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

  const handleRemoveStatus = () => {
    if (isSuccess) {
      setSuccess(false);
      setValue('');
    } else {
      setIsError(false);
    }
  };

  return (
    <Dialog onOpenChange={open => !open && handleRemoveStatus()}>
      <DialogTrigger asChild>
        <Button className='w-full md:w-48'>Deposit</Button>
      </DialogTrigger>
      {(isSuccess || isError) && (
        <StatusModal
          status={isError ? 'error' : 'success'}
          type='deposit'
          handleBtn={handleRemoveStatus}
        />
      )}
      {!isSuccess && !isError && (
        <DialogContent className='w-[300px] md:w-[400px]'>
          <form
            onSubmit={e => {
              e.preventDefault();
              if (!address || !value) return;
              void (async () => {
                const args = [
                  new Address(address).toScVal(),
                  xdr.ScVal.scvSymbol(asset.symbol),
                  new ScInt(
                    toBaseUnitAmount('9090192313123123', asset.exponents).toFixed(),
                  ).toU128(),
                ];
                await write(CONTRACT_ADDRESS, ContractMethods.DEPOSIT, args);
                await refetch();
              })();
            }}
          >
            <DialogHeader>
              <DialogTitle>
                Deposit <span className='uppercase'>{asset.symbol}</span>
              </DialogTitle>
            </DialogHeader>
            <div className='mt-2 grid gap-6 md:gap-10'>
              <BalanceInput
                balanceTitle='Available to deposit'
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
                <p className='subtitle2'>Deposit Rates</p>
                <div className='flex flex-col'>
                  <div className='flex justify-between border-b-[1px] border-[#0344E9] p-[10px]'>
                    <div className='flex gap-2'>
                      <Image src={asset.icon} alt='' width={20} height={20} />
                      <p className='subtitle3'>Deposit APY</p>
                    </div>
                    <p className='number2'>
                      {displayAmount(fromBaseUnitAmount(apy, EIGHTEEN_EXPONENT).toNumber())}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className='mt-4'>
              <Button
                type='submit'
                className='w-full md:w-full'
                disabled={Boolean(validationResult?.issue) || !value || isLoading}
              >
                {isLoading ? (
                  <>
                    <div
                      className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                      role='status'
                    >
                      <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
                        Loading...
                      </span>
                    </div>
                    <span className={'ml-2.5'}>Pending</span>
                  </>
                ) : (
                  validationResult?.issue ?? 'Confirm'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
};
