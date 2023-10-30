'use client';
import { useSorobanReact } from '@soroban-react/core';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { Address } from 'soroban-client';
import { Progress } from 'ui';
import { useReadContract } from '../../hooks/read-contract';
import { ContractMethods } from '../../types/contract';
import { CONTRACT_ADDRESS } from '../../utils/addresses';
import { formatNumber } from '../../utils/format-number';
import { formatValue } from '../../utils/format-value';

function calculatePercentage(value: BigNumber, total: BigNumber): BigNumber {
  if (total.isZero()) return BigNumber(0);
  return BigNumber(value.toString()).div(BigNumber(total.toString())).multipliedBy(BigNumber(100));
}

export const Balances = () => {
  const { address } = useSorobanReact();

  const args = useMemo(() => {
    if (!address) return [];
    return [new Address(address).toScVal()];
  }, [address]);

  const { data: supplyData } = useReadContract<BigNumber>(
    CONTRACT_ADDRESS,
    ContractMethods.GET_USER_DEPOSITED_USD,
    BigNumber(0),
    args,
    Boolean(address),
  );

  const { data: borrowData } = useReadContract<BigNumber>(
    CONTRACT_ADDRESS,
    ContractMethods.GET_USER_BORROWED_USD,
    BigNumber(0),
    args,
    Boolean(address),
  );

  const { data: collateral } = useReadContract<BigNumber>(
    CONTRACT_ADDRESS,
    ContractMethods.GET_USER_COLLATERAL_USD,
    BigNumber(0),
    args,
    Boolean(address),
  );

  const { borrowUscd, collateralUsdc, percent } = useMemo(() => {
    const borrowUscd = formatValue(borrowData, 8);
    const collateralUsdc = formatValue(collateral, 8);
    const percent = calculatePercentage(borrowUscd, collateralUsdc).toNumber();

    return {
      borrowUscd: borrowUscd.toNumber(),
      collateralUsdc: collateralUsdc.toNumber(),
      percent,
    };
  }, [borrowData, collateral]);

  return (
    <div className='card-gradient flex flex-col rounded-lg px-[16px] pb-[48px] pt-[40px] md:px-[20px] md:pb-[16px] md:pt-[16px] '>
      <div className='mb-7 flex flex-col md:mb-4 md:flex-row md:items-center md:justify-around'>
        <div className='order-1 mb-7 flex h-[186px] w-[186px] flex-col items-center justify-center gap-y-[0.25rem] self-center rounded-full border-4 border-[#0344E9] md:order-2 md:mb-4 md:gap-y-2'>
          <p className='h2'>TVL</p>
          <p className='title'>$0</p>
        </div>
        <div className='order-2 flex flex-row items-center justify-between md:order-1 md:flex-col md:gap-4'>
          <p className='h2 md:text-[#0344E9]'>Supply Balance</p>
          <p className='title'>${formatNumber(formatValue(supplyData, 8).toNumber())}</p>
        </div>
        <div className='order-3 flex flex-row items-center justify-between md:flex-col md:gap-4'>
          <p className='h2 md:text-[#0344E9]'>Borrow Balance</p>
          <p className='title'>${formatNumber(borrowUscd)}</p>
        </div>
      </div>
      <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
        <p className='subtitle2 text-[#0344E9] md:text-[#FFFFFF]'>Borrow limit</p>
        <div className='flex flex-1 items-center gap-3 md:gap-4'>
          <p className='number2 text-[#E3E3E3]'>{formatNumber(borrowUscd)}$</p>
          <Progress value={percent} />
          <p className='number2 text-[#E3E3E3]'>{formatNumber(collateralUsdc)}$</p>
        </div>
      </div>
    </div>
  );
};
