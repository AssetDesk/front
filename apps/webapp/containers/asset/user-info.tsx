'use client';
import { useSorobanReact } from '@soroban-react/core';
import BigNumber from 'bignumber.js';
import { InfoIcon, WalletIcon } from 'lucide-react';
import { useMemo } from 'react';
import { Address, xdr } from 'soroban-client';
import { FadeTransition } from '../../components';
import { useAssetBySlug } from '../../hooks/asset-by-slug';
import { useAssetPrice } from '../../hooks/asset-price';
import { useReadContract } from '../../hooks/read-contract';
import { ContractMethods } from '../../types/contract';
import { CONTRACT_ADDRESS } from '../../utils/constants';
import { formatNumber } from '../../utils/format-number';
import { formatValue } from '../../utils/format-value';
import { BorrowModal } from './borrow-modal';
import { RepayModal } from './repay-modal';
import { SupplyModal } from './supply-modal';
import { WithdrawModal } from './withdraw-modal';

export const UserInfo = () => {
  const { address } = useSorobanReact();
  const asset = useAssetBySlug();

  const args = useMemo(() => {
    if (!address) return [];
    return [new Address(address).toScVal()];
  }, [address]);

  const { data: walletBalanceData, refetch: refetchWalletBalance } = useReadContract<BigNumber>(
    asset!.address,
    ContractMethods.BALANCE,
    BigNumber(0),
    args,
    Boolean(address),
  );

  const assetPrice = useAssetPrice(asset!.symbol);

  const { data: availableBorrowData } = useReadContract<BigNumber>(
    CONTRACT_ADDRESS,
    ContractMethods.GET_AVAILABLE_TO_BORROW,
    BigNumber(0),
    [...args, xdr.ScVal.scvSymbol(asset!.symbol)],
    Boolean(address),
  );

  const { data: availableRedeemData, refetch: refetchRedeem } = useReadContract<BigNumber>(
    CONTRACT_ADDRESS,
    ContractMethods.GET_AVAILABLE_TO_REDEEM,
    BigNumber(0),
    [...args, xdr.ScVal.scvSymbol(asset!.symbol)],
    Boolean(address),
  );

  const { data: availableRepayData } = useReadContract<BigNumber>(
    CONTRACT_ADDRESS,
    ContractMethods.GET_USER_BORROW_AMOUNT_WITH_INTEREST,
    BigNumber(0),
    [...args, xdr.ScVal.scvSymbol(asset!.symbol)],
    Boolean(address),
  );

  const { walletBalance, walletBalanceUsdc } = useMemo(() => {
    const walletBalance = formatValue(walletBalanceData, asset!.exponents);

    return {
      walletBalance: walletBalance.toNumber(),
      walletBalanceUsdc: walletBalance.multipliedBy(assetPrice).toNumber(),
    };
  }, [assetPrice, walletBalanceData, asset]);

  const { availableBorrow, availableBorrowUsdc } = useMemo(() => {
    const availableBorrow = formatValue(availableBorrowData, asset!.exponents);

    return {
      availableBorrow: availableBorrow.toNumber(),
      availableBorrowUsdc: availableBorrow.multipliedBy(assetPrice).toNumber(),
    };
  }, [assetPrice, availableBorrowData, asset]);

  const { availableRedeem, availableRedeemUsdc } = useMemo(() => {
    const availableRedeem = formatValue(availableRedeemData, asset!.exponents);

    return {
      availableRedeem: availableRedeem.toNumber(),
      availableRedeemUsdc: availableRedeem.multipliedBy(assetPrice).toNumber(),
    };
  }, [assetPrice, availableRedeemData, asset]);

  const { availableRepay, availableRepayUsdc } = useMemo(() => {
    const availableRepay = formatValue(availableRepayData, asset!.exponents);

    return {
      availableRepay: availableRepay.toNumber(),
      availableRepayUsdc: availableRepay.multipliedBy(assetPrice).toNumber(),
    };
  }, [assetPrice, availableRepayData, asset]);

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
                {formatNumber(walletBalance)} {asset!.symbol}
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
                  {formatNumber(walletBalance)} {asset!.symbol}
                </p>
                <p className='number2'>${formatNumber(walletBalanceUsdc)}</p>
              </div>
              <SupplyModal
                balance={walletBalance}
                asset={asset!}
                refetch={async () => {
                  await refetchWalletBalance();
                  await refetchRedeem();
                }}
              />
            </div>
            <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
              <div className='flex flex-col gap-1 border-l-[1px] border-[#0344E9] pl-4'>
                <div className='flex items-center gap-2'>
                  <p className='subtitle2 text-[#E3E3E3]'>Available to borrow</p>
                  <InfoIcon className='h-4 w-4 text-[#B0A8A8]' />
                </div>
                <p className='number mt-1'>
                  {formatNumber(availableBorrow)} {asset!.symbol}
                </p>
                <p className='number2'>${formatNumber(availableBorrowUsdc)}</p>
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
                  {formatNumber(availableRedeem)} {asset!.symbol}
                </p>
                <p className='number2'>${formatNumber(availableRedeemUsdc)}</p>
              </div>
              <WithdrawModal
                balance={availableRedeem}
                asset={asset!}
                refetch={async () => {
                  await refetchWalletBalance();
                  await refetchRedeem();
                }}
              />
            </div>
            <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
              <div className='flex flex-col gap-1 border-l-[1px] border-[#0344E9] pl-4'>
                <div className='flex items-center gap-2'>
                  <p className='subtitle2 text-[#E3E3E3]'>Available to repay</p>
                  <InfoIcon className='h-4 w-4 text-[#B0A8A8]' />
                </div>
                <p className='number mt-1'>
                  {formatNumber(availableRepay)} {asset!.symbol}
                </p>
                <p className='number2'>${formatNumber(availableRepayUsdc)}</p>
              </div>
              <RepayModal />
            </div>
          </div>
        </div>
      </div>
    </FadeTransition>
  );
};
