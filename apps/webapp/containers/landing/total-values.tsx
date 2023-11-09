'use client';

import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { useReadContract } from '../../hooks/read-contract';
import { useReadContractMultiAssets } from '../../hooks/read-contract-multi-assets';
import { ContractMethods } from '../../types/contract';
import { assetInitialValue, assets, assetsArguments, formattedNumber } from '../../utils';
import { fromBaseUnitAmount } from '../../utils/amount';
import { CONTRACT_ADDRESS, USDC_EXPONENT } from '../../utils/constants';

export const TotalValues = () => {
  const { data: totalReserves } = useReadContractMultiAssets<Record<string, BigNumber | undefined>>(
    CONTRACT_ADDRESS,
    ContractMethods.GET_TOTAL_RESERVES_BY_TOKEN,
    assetInitialValue,
    assetsArguments,
  );

  const { data: price } = useReadContractMultiAssets<Record<string, BigNumber | undefined>>(
    CONTRACT_ADDRESS,
    ContractMethods.GET_PRICE,
    assetInitialValue,
    assetsArguments,
  );

  const { data: tvl } = useReadContract<BigNumber>(
    CONTRACT_ADDRESS,
    ContractMethods.GET_TVL,
    BigNumber(0),
  );

  const { totalBorrowed, marketSize, totalLiquidity } = useMemo(() => {
    const assetsReserves = assets.map(asset => ({
      totalReserves: fromBaseUnitAmount(
        totalReserves[asset.symbol] ?? BigNumber(0),
        asset.exponents,
      ).multipliedBy(fromBaseUnitAmount(price[asset.symbol] ?? BigNumber(0), USDC_EXPONENT)),
    }));

    const sumAssetsTotalReserves = assetsReserves.reduce(
      (acc, i) => acc.plus(i.totalReserves),
      BigNumber(0),
    );

    const formattedTVL = fromBaseUnitAmount(tvl, USDC_EXPONENT);

    return {
      totalBorrowed: sumAssetsTotalReserves.minus(formattedTVL).toNumber(),
      marketSize: sumAssetsTotalReserves.toNumber(),
      totalLiquidity: formattedTVL.toNumber(),
    };
  }, [totalReserves, price, tvl]);

  return (
    <div className='mb-[100px] mt-20 flex flex-col gap-6 md:mb-[132px] md:mt-[272px] md:flex-row md:gap-4'>
      <div className='card-gradient-secondary flex flex-1 flex-col items-center justify-center gap-2 rounded-lg py-7 md:py-12'>
        <p className='subtitle1 text-[#E3E3E3]'>Market Size</p>
        <p className='title'>${formattedNumber(marketSize)}</p>
      </div>
      <div className='card-gradient-secondary flex flex-1 flex-col items-center justify-center gap-2 rounded-lg py-7 md:py-12'>
        <p className='subtitle1 text-[#E3E3E3]'>Total Borrowed</p>
        <p className='title'>${formattedNumber(totalBorrowed)}</p>
      </div>
      <div className='card-gradient-secondary flex flex-1 flex-col items-center justify-center gap-2 rounded-lg py-7 md:py-12'>
        <p className='subtitle1 text-[#E3E3E3]'>Total Liquidity</p>
        <p className='title'>${formattedNumber(totalLiquidity)}</p>
      </div>
    </div>
  );
};
