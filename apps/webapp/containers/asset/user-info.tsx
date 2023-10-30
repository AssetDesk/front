'use client';
import { useSorobanReact } from '@soroban-react/core';
import { useMemo } from 'react';
import { Address, xdr } from 'soroban-client';
import { FadeTransition } from '../../components';
import { BorrowModal } from './borrow-modal';
import { RepayModal } from './repay-modal';
import { SupplyModal } from './supply-modal';
import { WithdrawModal } from './withdraw-modal';
import { useAssetBySlug } from '../../hooks/asset-by-slug';
import { formatNumber } from '../../utils/format-number';
import { calculateBalanceExponents } from '../../utils/calculate-balance-exponents';
import { useReadContract } from '../../hooks/read-contract';
import { ContractMethods } from '../../types/contract';
import { CONTRACT_ADDRESS } from '../../utils/addresses';
import BigNumber from 'bignumber.js';
import { useAssetPrice } from '../../hooks/asset-price';
import { InfoIcon, WalletIcon } from 'lucide-react';

export const UserInfo = () => {
  const { address } = useSorobanReact();
  const asset = useAssetBySlug();

  const args = useMemo(() => {
    if (!address) return [];
    return [new Address(address).toScVal()];
  }, [address]);

  const { data: walletBalanceData } = useReadContract<BigNumber>(
    asset!.address,
    ContractMethods.BALANCE,
    BigNumber(0),
    args,
    Boolean(address),
  );

  const assetPrice = useAssetPrice(asset!.symbol);

  const { data: depositData } = useReadContract<BigNumber>(
    CONTRACT_ADDRESS,
    ContractMethods.GET_DEPOSIT,
    BigNumber(0),
    [...args, xdr.ScVal.scvSymbol(asset!.symbol)],
    Boolean(address),
  );

  const { deposit, depositInUsdc } = useMemo(() => {
    const deposit = calculateBalanceExponents(depositData, asset!.exponents);
    return {
      deposit,
      depositInUsdc: deposit.multipliedBy(assetPrice),
    };
  }, [assetPrice, depositData, asset]);

  const { walletBalance, walletBalanceInUsdc } = useMemo(() => {
    const walletBalance = calculateBalanceExponents(walletBalanceData, asset!.exponents);

    return {
      walletBalance,
      walletBalanceInUsdc: walletBalance.multipliedBy(assetPrice),
    };
  }, [assetPrice, walletBalanceData, asset]);

  return (
    <FadeTransition>
      <div className='flex flex-col gap-[18px]'>
        <p className='h2'>Your info</p>
        <div className='card-gradient flex flex-col rounded-lg px-4 pb-10 pt-4  md:px-[30px] md:pb-14 md:pt-5'>
          <div className='flex items-center gap-4 border-b-[1px] border-[rgba(8,46,143,0.50)] pb-4 md:pb-6 '>
            <WalletIcon className='h-30 h-30 text-[#E3E3E3] md:h-10 md:w-10' />
            <div className='flex flex-col gap-2'>
              <p className='subtitle1'>Wallet balance</p>
              <p className='number2'>
                {formatNumber(walletBalance.toNumber())}
                {asset!.symbol}
              </p>
            </div>
          </div>
          <div className='mt-6 flex flex-col gap-6 md:gap-6'>
            <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
              <div className='flex flex-col gap-1 border-l-[1px] border-[#0344E9] pl-4'>
                <div className='flex items-center gap-2'>
                  <p className='subtitle2 text-[#E3E3E3]'>Available to supply</p>
                  <InfoIcon className='h-4 w-4 text-[#B0A8A8]' />
                </div>
                <p className='number mt-1'>
                  {formatNumber(walletBalance.toNumber())} {asset!.symbol}
                </p>
                <p className='number2'>${formatNumber(walletBalanceInUsdc.toNumber())}</p>
              </div>
              <SupplyModal />
            </div>
            <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
              <div className='flex flex-col gap-1 border-l-[1px] border-[#0344E9] pl-4'>
                <div className='flex items-center gap-2'>
                  <p className='subtitle2 text-[#E3E3E3]'>Available to borrow</p>
                  <InfoIcon className='h-4 w-4 text-[#B0A8A8]' />
                </div>
                <p className='number mt-1'>760.00 {asset!.symbol}</p>
                <p className='number2'>$760.00</p>
              </div>
              <BorrowModal />
            </div>
            <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
              <div className='flex flex-col gap-1 border-l-[1px] border-[#0344E9] pl-4'>
                <div className='flex items-center gap-2'>
                  <p className='subtitle2 text-[#E3E3E3]'>Available to withdraw</p>
                  <InfoIcon className='h-4 w-4 text-[#B0A8A8]' />
                </div>
                <p className='number mt-1'>
                  {formatNumber(deposit.toNumber())} {asset!.symbol}
                </p>
                <p className='number2'>
                  $ {formatNumber(depositInUsdc.toNumber())} {asset!.symbol}
                </p>
              </div>
              <WithdrawModal />
            </div>
            <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
              <div className='flex flex-col gap-1 border-l-[1px] border-[#0344E9] pl-4'>
                <div className='flex items-center gap-2'>
                  <p className='subtitle2 text-[#E3E3E3]'>Available to repay</p>
                  <InfoIcon className='h-4 w-4 text-[#B0A8A8]' />
                </div>
                <p className='number mt-1'>760.00 {asset!.symbol}</p>
                <p className='number2'>$760.00</p>
              </div>
              <RepayModal />
            </div>
          </div>
        </div>
      </div>
    </FadeTransition>
  );
};
