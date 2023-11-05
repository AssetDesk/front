import { useMemo } from 'react';
import { formatNumber } from '../../utils/format-number';
import { formatValue } from '../../utils/format-value';
import { EIGHTEEN_EXPONENT, USDC_EXPONENT } from '../../utils/constants';
import { useAssetBySlug } from '../../hooks/asset-by-slug';
import BigNumber from 'bignumber.js';

export interface AssetInfo {
  totalReserves: BigNumber;
  price: BigNumber;
  availableLiquidity: BigNumber;
  utilizationRate: BigNumber;
  liquidityRate: BigNumber;
  interestRate: BigNumber;
}

export const AssetDashboard = ({ data }: { data: AssetInfo }) => {
  const asset = useAssetBySlug();

  const formattedValue = useMemo(() => {
    const price = formatValue(data.price, USDC_EXPONENT).toNumber();
    const totalReserves = formatValue(data.totalReserves, asset!.exponents).toNumber();
    const availableLiquidity = formatValue(data.availableLiquidity, asset!.exponents).toNumber();

    const utilizationRate = formatValue(data.utilizationRate, 5).toNumber();
    const depositAPY = formatValue(data.liquidityRate, EIGHTEEN_EXPONENT).toNumber();
    const borrowAPY = formatValue(data.interestRate, EIGHTEEN_EXPONENT).toNumber();

    return {
      reservesSize: totalReserves * price,
      availableLiquidity: availableLiquidity * price,
      utilizationRate,
      price,
      depositAPY,
      borrowAPY,
    };
  }, [data, asset]);
  
  return (
    <div className='card-gradient grid grid-cols-2 gap-4 rounded-lg px-4 pb-5 pt-4 md:grid-cols-7 md:gap-6 md:p-[30px]'>
      <div className='grid-row-2 grid gap-1 md:text-center'>
        <p className='subtitle2 text-[#E3E3E3]'>Reserve Size</p>
        <p className='number'>${formatNumber(formattedValue.reservesSize)}</p>
      </div>
      <div
        className='grid-row-2 grid gap-1
       md:text-center'
      >
        <p className='subtitle2 text-[#E3E3E3]'>Available Liquidity</p>
        <p className='number'>${formatNumber(formattedValue.availableLiquidity)}</p>
      </div>
      <div
        className='grid-row-2 grid gap-1
       md:text-center'
      >
        <p className='subtitle2 text-[#E3E3E3]'>Utilization Rate</p>
        <p className='number'>{formatNumber(formattedValue.utilizationRate)}%</p>
      </div>
      <div
        className='grid-row-2 grid gap-1 md:text-center
      '
      >
        <p className='subtitle2 text-[#E3E3E3]'>Price</p>
        <p className='number'>${formatNumber(formattedValue.price)}</p>
      </div>
      <div
        className='grid-row-2 grid gap-1 md:text-center
      '
      >
        <p className='subtitle2 text-[#E3E3E3]'>Deposit APY</p>
        <p className='number'>{formatNumber(formattedValue.depositAPY)}%</p>
      </div>
      <div
        className='grid-row-2 grid gap-1 md:text-center
      '
      >
        <p className='subtitle2 text-[#E3E3E3]'>Total Borrowed</p>
        <p className='number'>$1,931.49</p>
      </div>
      <div
        className='grid-row-2 grid gap-1 md:text-center
      '
      >
        <p className='subtitle2 text-[#E3E3E3]'>Borrow APY</p>
        <p className='number'>{formatNumber(formattedValue.borrowAPY)}%</p>
      </div>
    </div>
  );
};
