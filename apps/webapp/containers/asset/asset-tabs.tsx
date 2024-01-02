'use client';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'ui';
import { AssetDashboard, AssetInfo } from './asset-dashboard';
import { ReserveConfiguration } from './reserve-configuration';
import { UserInfo } from './user-info';
import { useAssetBySlug } from '../../hooks/asset-by-slug';
import { useMultiCall } from '../../hooks/multi-call';
import BigNumber from 'bignumber.js';
import { CONTRACT_ADDRESS } from '../../utils/constants';
import { ContractMethods } from '../../types/contract';
import { xdr } from 'stellar-sdk';
import { useSorobanReact } from '@soroban-react/core';
import { UserNotConnected } from './user-not-connected';

export const AssetTabs = () => {
  const asset = useAssetBySlug();
  const { address } = useSorobanReact();

  const { data, refetch } = useMultiCall<AssetInfo>(
    CONTRACT_ADDRESS,
    [
      { key: 'totalReserves', method: ContractMethods.GET_TOTAL_RESERVES_BY_TOKEN },
      {
        key: 'price',
        method: ContractMethods.GET_PRICE,
      },
      {
        key: 'availableLiquidity',
        method: ContractMethods.GET_AVAILABLE_LIQUIDITY_BY_TOKEN,
      },
      {
        key: 'utilizationRate',
        method: ContractMethods.GET_UTILIZATION_RATE_BY_TOKEN,
      },
      {
        key: 'liquidityRate',
        method: ContractMethods.GET_LIQUIDITY_RATE,
      },
      {
        key: 'interestRate',
        method: ContractMethods.GET_INTEREST_RATE,
      },
      {
        key: 'totalBorrowed',
        method: ContractMethods.GET_TOTAL_BORROWED_BY_TOKEN,
      },
    ],
    {
      totalReserves: BigNumber(0),
      price: BigNumber(0),
      availableLiquidity: BigNumber(0),
      utilizationRate: BigNumber(0),
      liquidityRate: BigNumber(0),
      interestRate: BigNumber(0),
      totalBorrowed: BigNumber(0),
    },
    [xdr.ScVal.scvSymbol(asset!.symbol)],
    undefined,
    `asset-info-multi-${asset!.symbol}`,
  );

  return (
    <Tabs defaultValue='Your info' className='w-full'>
      <TabsList className='w-full md:w-[242px]'>
        {/* <TabsTrigger value='Overview' disabled className='flex-1'>
          Overview
        </TabsTrigger> */}
        <TabsTrigger value='Your info' className='flex-1'>
          Your info
        </TabsTrigger>
      </TabsList>
      <div className='mb-10 mt-6 flex-1'>
        <AssetDashboard data={data} />
      </div>
      <TabsContent value='Overview'>
        <ReserveConfiguration />
      </TabsContent>
      <TabsContent value='Your info'>
        {address ? (
          <UserInfo
            refetchAssetInfo={refetch}
            apy={{ depositAPY: data.liquidityRate, borrowAPY: data.interestRate }}
          />
        ) : (
          <UserNotConnected />
        )}
      </TabsContent>
    </Tabs>
  );
};
