'use client';
import { useSorobanReact } from '@soroban-react/core';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import { WalletIcon } from 'lucide-react';
import { useMemo } from 'react';
import { Address, xdr } from 'soroban-client';
import { FadeTransition } from '../../components';
import { useAssetBySlug } from '../../hooks/asset-by-slug';
import { useAssetPrice } from '../../hooks/asset-price';
import { useMultiCall } from '../../hooks/multi-call';
import { useReadContract } from '../../hooks/read-contract';
import { ContractMethods } from '../../types/contract';
import { displayAmount, displayUsd, fromBaseUnitAmount } from '../../utils/amount';
import { CONTRACT_ADDRESS } from '../../utils/constants';
import { AssetInfo } from './asset-dashboard';
import { BorrowModal } from './borrow-modal';
import { DepositModal } from './deposit-modal';
import { RepayModal } from './repay-modal';
import { RedeemModal } from './redeem-modal';

export const UserInfo = ({
  refetchAssetInfo,
  apy,
}: {
  apy: { depositAPY: BigNumber; borrowAPY: BigNumber };
  refetchAssetInfo: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<AssetInfo>>;
}) => {
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
    `${ContractMethods.BALANCE}-${asset?.symbol}`,
  );

  const assetPrice = useAssetPrice(asset!.symbol);

  const { data, refetch, error } = useMultiCall<{
    borrowAvailable: BigNumber;
    redeemAvailable: BigNumber;
    repayAvailable: BigNumber;
  }>(
    CONTRACT_ADDRESS,
    [
      { key: 'borrowAvailable', method: ContractMethods.GET_AVAILABLE_TO_BORROW },
      {
        key: 'redeemAvailable',
        method: ContractMethods.GET_AVAILABLE_TO_REDEEM,
      },
      {
        key: 'repayAvailable',
        method: ContractMethods.GET_USER_BORROW_AMOUNT_WITH_INTEREST,
      },
    ],
    {
      borrowAvailable: BigNumber(0),
      redeemAvailable: BigNumber(0),
      repayAvailable: BigNumber(0),
    },
    [...args, xdr.ScVal.scvSymbol(asset!.symbol)],
    Boolean(address),
    `user-info-multi-${asset?.symbol}`,
  );

  console.log(error);

  const { walletBalance, walletBalanceUsdc } = useMemo(() => {
    const walletBalance = fromBaseUnitAmount(walletBalanceData, asset!.exponents);

    return {
      walletBalance: walletBalance.toNumber(),
      walletBalanceUsdc: walletBalance.multipliedBy(assetPrice).toNumber(),
    };
  }, [assetPrice, walletBalanceData, asset]);

  const {
    availableBorrow,
    availableBorrowUsdc,
    availableRedeem,
    availableRedeemUsdc,
    availableRepay,
    availableRepayUsdc,
  } = useMemo(() => {
    const availableBorrow = fromBaseUnitAmount(data.borrowAvailable, asset!.exponents);
    const availableRedeem = fromBaseUnitAmount(data.redeemAvailable, asset!.exponents);
    const availableRepay = fromBaseUnitAmount(data.repayAvailable, asset!.exponents);

    return {
      availableBorrow: availableBorrow.toNumber(),
      availableBorrowUsdc: availableBorrow.multipliedBy(assetPrice).toNumber(),
      availableRedeem: availableRedeem.toNumber(),
      availableRedeemUsdc: availableRedeem.multipliedBy(assetPrice).toNumber(),
      availableRepay: availableRepay.toNumber(),
      availableRepayUsdc: availableRepay.multipliedBy(assetPrice).toNumber(),
    };
  }, [assetPrice, data, asset]);

  const refectData = async () => {
    await refetchWalletBalance();
    await refetch();
    await refetchAssetInfo();
  };

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
                {displayAmount(walletBalance)} {asset!.symbol}
              </p>
            </div>
          </div>
          <div className='mt-6 flex flex-col gap-6 md:gap-6'>
            <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
              <div className='flex flex-col gap-1 border-l-[1px] border-[#0344E9] pl-4'>
                <div className='flex items-center gap-2'>
                  <p className='subtitle2 text-[#E3E3E3]'>Available to deposit</p>
                </div>
                <p className='number mt-1'>
                  {displayAmount(walletBalance)} {asset!.symbol}
                </p>
                <p className='number2'>${displayUsd(walletBalanceUsdc)}</p>
              </div>
              <DepositModal
                balance={asset?.symbol === 'xlm' ? walletBalance - 5 : walletBalance}
                asset={asset!}
                refetch={refectData}
                apy={apy.depositAPY}
              />
            </div>
            <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
              <div className='flex flex-col gap-1 border-l-[1px] border-[#0344E9] pl-4'>
                <div className='flex items-center gap-2'>
                  <p className='subtitle2 text-[#E3E3E3]'>Available to borrow</p>
                </div>
                <p className='number mt-1'>
                  {displayAmount(availableBorrow)} {asset!.symbol}
                </p>
                <p className='number2'>${displayAmount(availableBorrowUsdc)}</p>
              </div>
              <BorrowModal
                balance={availableBorrow}
                asset={asset!}
                refetch={refectData}
                apy={apy.borrowAPY}
              />
            </div>
            <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
              <div className='flex flex-col gap-1 border-l-[1px] border-[#0344E9] pl-4'>
                <div className='flex items-center gap-2'>
                  <p className='subtitle2 text-[#E3E3E3]'>Available to redeem</p>
                </div>
                <p className='number mt-1'>
                  {displayAmount(availableRedeem)} {asset!.symbol}
                </p>
                <p className='number2'>${displayUsd(availableRedeemUsdc)}</p>
              </div>
              <RedeemModal
                balance={availableRedeem}
                asset={asset!}
                refetch={refectData}
                apy={apy.depositAPY}
              />
            </div>
            <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
              <div className='flex flex-col gap-1 border-l-[1px] border-[#0344E9] pl-4'>
                <div className='flex items-center gap-2'>
                  <p className='subtitle2 text-[#E3E3E3]'>Available to repay</p>
                </div>
                <p className='number mt-1'>
                  {displayAmount(availableRepay)} {asset!.symbol}
                </p>
                <p className='number2'>${displayUsd(availableRepayUsdc)}</p>
              </div>
              <RepayModal
                balance={availableRepay}
                asset={asset!}
                refetch={refectData}
                apy={apy.borrowAPY}
              />
            </div>
          </div>
        </div>
      </div>
    </FadeTransition>
  );
};
