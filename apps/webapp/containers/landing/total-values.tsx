import BigNumber from 'bignumber.js';
import { formattedNumber } from '../../utils';

export const TotalValues = () => {
  // const { data: totalReserves } = useReadContractMultiAssets<Record<string, BigNumber | undefined>>(
  //   CONTRACT_ADDRESS,
  //   ContractMethods.GET_TOTAL_RESERVES_BY_TOKEN,
  //   assetInitialValue,
  //   assetsArguments,
  // );

  // const { data: price } = useReadContractMultiAssets<Record<string, BigNumber | undefined>>(
  //   CONTRACT_ADDRESS,
  //   ContractMethods.GET_PRICE,
  //   assetInitialValue,
  //   assetsArguments,
  // );

  // const { data: tvl } = useReadContract<BigNumber>(
  //   CONTRACT_ADDRESS,
  //   ContractMethods.GET_TVL,
  //   BigNumber(0),
  // );

  const sumAssetsTotalReserves = BigNumber(525619.23);
  // assetsReserves.reduce(
  //   (acc, i) => acc.plus(i.totalReserves),
  //   BigNumber(0),
  // );

  const formattedTVL = BigNumber(324971.78);

  const { totalBorrowed, marketSize, totalLiquidity } = {
    totalBorrowed: sumAssetsTotalReserves.minus(formattedTVL).toNumber(),
    marketSize: sumAssetsTotalReserves.toNumber(),
    totalLiquidity: formattedTVL.toNumber(),
  };

  // useMemo(
  //   () => {
  //     // const assetsReserves = assets.map(asset => ({
  //     //   totalReserves: fromBaseUnitAmount(
  //     //     totalReserves[asset.symbol] ?? BigNumber(0),
  //     //     asset.exponents,
  //     //   ).multipliedBy(fromBaseUnitAmount(price[asset.symbol] ?? BigNumber(0), USDC_EXPONENT)),
  //     // }));

  //     const sumAssetsTotalReserves = BigNumber(525619.23);
  //     // assetsReserves.reduce(
  //     //   (acc, i) => acc.plus(i.totalReserves),
  //     //   BigNumber(0),
  //     // );

  //     const formattedTVL = BigNumber(324971.78);
  //     // fromBaseUnitAmount(tvl, USDC_EXPONENT);

  //     return {
  //       totalBorrowed: sumAssetsTotalReserves.minus(formattedTVL).toNumber(),
  //       marketSize: sumAssetsTotalReserves.toNumber(),
  //       totalLiquidity: formattedTVL.toNumber(),
  //     };
  //   },
  //   [
  //     // totalReserves, price, tvl
  //   ],
  // );

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
