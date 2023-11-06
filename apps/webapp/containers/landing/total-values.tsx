'use client';

import BigNumber from 'bignumber.js';
import { useReadContractMultiAssets } from '../../hooks/read-contract-multi-assets';
import { ContractMethods } from '../../types/contract';
import { xdr } from 'soroban-client';
import { CONTRACT_ADDRESS, USDC_EXPONENT } from '../../utils/constants';
import { useMemo } from 'react';
import { assets } from '../../utils';
import { formatValue } from '../../utils/format-value';
import { formatNumber } from '../../utils/format-number';
import { useReadContract } from '../../hooks/read-contract';

const initialValue = { xlm: BigNumber(0), atk: BigNumber(0), btk: BigNumber(0) };

export const TotalValues = () => {
  const { data: totalReserves } = useReadContractMultiAssets<Record<string, BigNumber | undefined>>(
    CONTRACT_ADDRESS,
    ContractMethods.GET_TOTAL_RESERVES_BY_TOKEN,
    initialValue,
    {
      xlm: [xdr.ScVal.scvSymbol('xlm')],
      atk: [xdr.ScVal.scvSymbol('atk')],
      btk: [xdr.ScVal.scvSymbol('btk')],
    },
  );

  const { data: price } = useReadContractMultiAssets<Record<string, BigNumber | undefined>>(
    CONTRACT_ADDRESS,
    ContractMethods.GET_PRICE,
    initialValue,
    {
      xlm: [xdr.ScVal.scvSymbol('xlm')],
      atk: [xdr.ScVal.scvSymbol('atk')],
      btk: [xdr.ScVal.scvSymbol('btk')],
    },
  );

  const { data: tvl } = useReadContract<BigNumber>(
    CONTRACT_ADDRESS,
    ContractMethods.GET_TVL,
    BigNumber(0),
  );

  const { totalBorrowed, marketSize, totalLiquidity } = useMemo(() => {
    const assetsReserves = assets.map(asset => ({
      totalReserves: formatValue(
        totalReserves[asset.symbol] ?? BigNumber(0),
        asset.exponents,
      ).multipliedBy(formatValue(price[asset.symbol] ?? BigNumber(0), USDC_EXPONENT)),
    }));

    const sumAssetsTotalReserves = assetsReserves.reduce(
      (acc, i) => acc.plus(i.totalReserves),
      BigNumber(0),
    );

    const formattedTVL = formatValue(tvl, USDC_EXPONENT);

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
        <p className='title'>${formatNumber(marketSize)}</p>
      </div>
      <div className='card-gradient-secondary flex flex-1 flex-col items-center justify-center gap-2 rounded-lg py-7 md:py-12'>
        <p className='subtitle1 text-[#E3E3E3]'>Total Borrowed</p>
        <p className='title'>${formatNumber(totalBorrowed)}</p>
      </div>
      <div className='card-gradient-secondary flex flex-1 flex-col items-center justify-center gap-2 rounded-lg py-7 md:py-12'>
        <p className='subtitle1 text-[#E3E3E3]'>Total Liquidity</p>
        <p className='title'>${formatNumber(totalLiquidity)}</p>
      </div>
    </div>
  );
};
