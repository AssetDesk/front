'use client';
import { useSorobanReact } from '@soroban-react/core';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { Address } from 'stellar-sdk';
import { Progress } from 'ui';
import { useMultiCall } from '../../hooks/multi-call';
import { useReadContract } from '../../hooks/read-contract';
import { ContractMethods } from '../../types/contract';
import { displayUsd, fromBaseUnitAmount } from '../../utils/amount';
import { CONTRACT_ADDRESS, USDC_EXPONENT } from '../../utils/constants';
import { calculatePercentage } from '../../utils/calculate-percentage';
import { formattedNumber } from '../../utils';

export const Balances = () => {
  const { address } = useSorobanReact();

  const args = useMemo(() => {
    if (!address) return [];
    return [new Address(address).toScVal()];
  }, [address]);

  const { data } = useMultiCall<{
    deposit: BigNumber;
    borrow: BigNumber;
    collateral: BigNumber;
  }>(
    CONTRACT_ADDRESS,
    [
      { key: 'deposit', method: ContractMethods.GET_USER_DEPOSITED_USD },
      {
        key: 'borrow',
        method: ContractMethods.GET_USER_BORROWED_USD,
      },
      {
        key: 'collateral',
        method: ContractMethods.GET_USER_COLLATERAL_USD,
      },
    ],
    {
      deposit: BigNumber(0),
      borrow: BigNumber(0),
      collateral: BigNumber(0),
    },
    args,
    Boolean(address),
  );

  const { data: tvl } = useReadContract<BigNumber>(
    CONTRACT_ADDRESS,
    ContractMethods.GET_TVL,
    BigNumber(0),
  );

  const { borrowUscd, collateralUsdc, percent, depositUsdc } = useMemo(() => {
    const depositUsdc = fromBaseUnitAmount(data.deposit, USDC_EXPONENT).toNumber();
    const borrowUscd = fromBaseUnitAmount(data.borrow, USDC_EXPONENT);
    const collateralUsdc = fromBaseUnitAmount(data.collateral, USDC_EXPONENT).multipliedBy(
      BigNumber(0.75),
    );
    const percent = calculatePercentage(borrowUscd, collateralUsdc).toNumber();

    return {
      borrowUscd: borrowUscd.toNumber(),
      collateralUsdc: collateralUsdc.toNumber(),
      percent,
      depositUsdc,
    };
  }, [data]);

  return (
    <div className='card-gradient flex flex-col rounded-lg px-[16px] pb-[48px] pt-[40px] md:px-[20px] md:pb-[16px] md:pt-[16px] '>
      <div className='mb-7 flex flex-col md:mb-4 md:flex-row md:items-center md:justify-around'>
        <div className='order-1 mb-7 flex h-[186px] w-[186px] flex-col items-center justify-center gap-y-[0.25rem] self-center rounded-full border-4 border-[#0344E9] md:order-2 md:mb-4 md:gap-y-2'>
          <p className='h2'>TVL</p>
          <p className='title'>
            ${formattedNumber(fromBaseUnitAmount(tvl, USDC_EXPONENT).toNumber())}
          </p>
        </div>
        <div className='order-2 flex flex-row items-center justify-between md:order-1 md:flex-col md:gap-4'>
          <p className='h2 md:text-[#0344E9]'>Deposit Balance</p>
          <p className='title'>${displayUsd(depositUsdc)}</p>
        </div>
        <div className='order-3 flex flex-row items-center justify-between md:flex-col md:gap-4'>
          <p className='h2 md:text-[#0344E9]'>Borrow Balance</p>
          <p className='title'>${displayUsd(borrowUscd)}</p>
        </div>
      </div>
      <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
        <p className='subtitle2 text-[#0344E9] md:text-[#FFFFFF]'>Borrow limit</p>
        <div className='flex flex-1 items-center gap-3 md:gap-4'>
          <p className='number2 text-[#E3E3E3]'>0$</p>
          <Progress value={percent} />
          <p className='number2 text-[#E3E3E3]'>{displayUsd(collateralUsdc)}$</p>
        </div>
      </div>
    </div>
  );
};
