import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { useAssetBySlug } from '../../hooks/asset-by-slug';
import { calculateToUSD, displayAmount, displayUsd, fromBaseUnitAmount } from '../../utils/amount';
import { EIGHTEEN_EXPONENT, USDC_EXPONENT } from '../../utils/constants';
import { formattedNumber } from '../../utils';

export interface AssetInfo {
  totalReserves: BigNumber;
  price: BigNumber;
  availableLiquidity: BigNumber;
  utilizationRate: BigNumber;
  liquidityRate: BigNumber;
  interestRate: BigNumber;
  totalBorrowed: BigNumber;
}

export const AssetDashboard = ({ data }: { data: AssetInfo }) => {
  const asset = useAssetBySlug();

  const formattedValue = useMemo(() => {
    const price = fromBaseUnitAmount(data.price, USDC_EXPONENT).toNumber();
    const totalReserves = fromBaseUnitAmount(data.totalReserves, asset!.exponents).toNumber();
    const availableLiquidity = fromBaseUnitAmount(
      data.availableLiquidity,
      asset!.exponents,
    ).toNumber();

    const utilizationRate = fromBaseUnitAmount(data.utilizationRate, 5).toNumber();
    const depositAPY = fromBaseUnitAmount(data.liquidityRate, EIGHTEEN_EXPONENT).toNumber();
    const borrowAPY = fromBaseUnitAmount(data.interestRate, EIGHTEEN_EXPONENT).toNumber();
    const totalBorrowed = calculateToUSD(
      data.totalBorrowed,
      asset!.exponents,
      data.price ?? BigNumber(0),
    ).toNumber();

    return {
      reservesSize: totalReserves * price,
      availableLiquidity: availableLiquidity * price,
      utilizationRate,
      price,
      depositAPY,
      borrowAPY,
      totalBorrowed,
    };
  }, [data, asset]);

  return (
    <div className='card-gradient grid grid-cols-2 gap-4 rounded-lg px-4 pb-5 pt-4 md:grid-cols-7 md:gap-6 md:p-[30px]'>
      <div className='grid-row-2 grid gap-1 md:text-center'>
        <p className='subtitle2 text-[#E3E3E3]'>Reserve Size</p>
        <p className='number'>${formattedNumber(formattedValue.reservesSize)}</p>
      </div>
      <div className='grid-row-2 grid gap-1 md:text-center'>
        <p className='subtitle2 text-[#E3E3E3]'>Available Liquidity</p>
        <p className='number'>${formattedNumber(formattedValue.availableLiquidity)}</p>
      </div>
      <div className='grid-row-2 grid gap-1 md:text-center'>
        <p className='subtitle2 text-[#E3E3E3]'>Utilization Rate</p>
        <p className='number'>{displayAmount(formattedValue.utilizationRate)}%</p>
      </div>
      <div className='grid-row-2 grid gap-1 md:text-center'>
        <p className='subtitle2 text-[#E3E3E3]'>Price</p>
        <p className='number'>${displayUsd(formattedValue.price)}</p>
      </div>
      <div className='grid-row-2 grid gap-1 md:text-center'>
        <p className='subtitle2 text-[#E3E3E3]'>Deposit APY</p>
        <p className='number'>{displayAmount(formattedValue.depositAPY)}%</p>
      </div>
      <div className='grid-row-2 grid gap-1 md:text-center'>
        <p className='subtitle2 text-[#E3E3E3]'>Total Borrowed</p>
        <p className='number'>${formattedNumber(formattedValue.totalBorrowed)}</p>
      </div>
      <div className='grid-row-2 grid gap-1 md:text-center'>
        <p className='subtitle2 text-[#E3E3E3]'>Borrow APY</p>
        <p className='number'>{displayAmount(formattedValue.borrowAPY)}%</p>
      </div>
    </div>
  );
};
