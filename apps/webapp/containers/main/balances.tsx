'use client';
import React, {useMemo} from 'react';
import { Progress } from 'ui';
import {useSorobanReact} from "@soroban-react/core";
import {Address} from "soroban-client";
import {useReadContract} from "../../hooks/read-contract";
import {ContractMethods} from "../../types/contract";
import {calculateBalanceExponents} from "../../utils/calculate-balance-exponents";
import {formatNumber} from "../../utils/format-number";
import BigNumber from "bignumber.js";

function calculatePercentage(value: bigint, total: bigint): BigNumber {
  if(total === 0n) return BigNumber(0)
  return BigNumber(value.toString()).div(BigNumber(total.toString())).multipliedBy(BigNumber(100))
}

export const Balances = () => {
  const { address } = useSorobanReact();

  const args = useMemo(() => {
    if (!address) return [];
    return [new Address(address).toScVal()];
  }, [address]);

  const { data: supply } = useReadContract<bigint>(
    'CCNH3C5OIG2XMIQDCBXSDCFL3IZTRBNVCFKNKX4KEA6E4UDNHJD3NLKG',
    ContractMethods.GET_USER_DEPOSITED_USD,
    0n,
    args,
    Boolean(address),
  );

  const { data: borrow } = useReadContract<bigint>(
    'CCNH3C5OIG2XMIQDCBXSDCFL3IZTRBNVCFKNKX4KEA6E4UDNHJD3NLKG',
    ContractMethods.GET_USER_BORROWED_USD,
    0n,
    args,
    Boolean(address),
  );

  const { data: collateral } = useReadContract<bigint>(
    'CCNH3C5OIG2XMIQDCBXSDCFL3IZTRBNVCFKNKX4KEA6E4UDNHJD3NLKG',
    ContractMethods.GET_USER_COLLATERAL_USD,
    0n,
    args,
    Boolean(address),
  );

  const calcSupplyData = useMemo(() => formatNumber(calculateBalanceExponents(BigNumber(supply.toString()) , 8).toNumber()), [supply]);
  const calcBorrowData = useMemo(() => formatNumber(calculateBalanceExponents(BigNumber(borrow.toString()), 8).toNumber()), [borrow]);
  const maxBorrow =  useMemo(() => formatNumber(calculateBalanceExponents(BigNumber(collateral.toString()), 8).toNumber()) , [collateral]);
  const percent = useMemo(() => calculateBalanceExponents(calculatePercentage( borrow, collateral), 8).toNumber(), [borrow, collateral]);

  return (
    <div className='card-gradient flex flex-col rounded-lg px-[16px] pb-[48px] pt-[40px] md:px-[20px] md:pb-[16px] md:pt-[16px] '>
      <div className='mb-7 flex flex-col md:mb-4 md:flex-row md:items-center md:justify-around'>
        <div className='order-1 mb-7 flex h-[186px] w-[186px] flex-col items-center justify-center gap-y-[0.25rem] self-center rounded-full border-4 border-[#0344E9] md:order-2 md:mb-4 md:gap-y-2'>
          <p className='h2'>TVL</p>
          <p className='title'>$0</p>
        </div>
        <div className='order-2 flex flex-row items-center justify-between md:order-1 md:flex-col md:gap-4'>
          <p className='h2 md:text-[#0344E9]'>Supply Balance</p>
          <p className='title'>${calcSupplyData}</p>
        </div>
        <div className='order-3 flex flex-row items-center justify-between md:flex-col md:gap-4'>
          <p className='h2 md:text-[#0344E9]'>Borrow Balance</p>
          <p className='title'>${calcBorrowData}</p>
        </div>
      </div>
      <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
        <p className='subtitle2 text-[#0344E9] md:text-[#FFFFFF]'>Borrow limit</p>
        <div className='flex flex-1 items-center gap-3 md:gap-4'>
          <p className='number2 text-[#E3E3E3]'>{calcBorrowData}$</p>
          <Progress value={percent} />
          <p className='number2 text-[#E3E3E3]'>{maxBorrow}$</p>
        </div>
      </div>
    </div>
  );
};
