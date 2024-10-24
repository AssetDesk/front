import BigNumber from 'bignumber.js';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'ui';
import { assets, formattedNumber, routesLinks } from '../../utils';
import { displayAmount, fromBaseUnitAmount } from '../../utils/amount';
import { EIGHTEEN_EXPONENT } from '../../utils/constants';

export const LandingTable = () => {
  // const { data: liquidityRates } = useReadContractMultiAssets<
  //   Record<string, BigNumber | undefined>
  // >(CONTRACT_ADDRESS, ContractMethods.GET_LIQUIDITY_RATE, assetInitialValue, assetsArguments);

  // const { data: interestRates } = useReadContractMultiAssets<Record<string, BigNumber | undefined>>(
  //   CONTRACT_ADDRESS,
  //   ContractMethods.GET_INTEREST_RATE,
  //   assetInitialValue,
  //   assetsArguments,
  // );

  // const { data: price } = useReadContractMultiAssets<Record<string, BigNumber | undefined>>(
  //   CONTRACT_ADDRESS,
  //   ContractMethods.GET_PRICE,
  //   assetInitialValue,
  //   assetsArguments,
  // );

  // const { data: totalReserves } = useReadContractMultiAssets<Record<string, BigNumber | undefined>>(
  //   CONTRACT_ADDRESS,
  //   ContractMethods.GET_TOTAL_RESERVES_BY_TOKEN,
  //   assetInitialValue,
  //   assetsArguments,
  // );

  // const { data: totalBorrowed } = useReadContractMultiAssets<Record<string, BigNumber | undefined>>(
  //   CONTRACT_ADDRESS,
  //   ContractMethods.GET_TOTAL_BORROWED_BY_TOKEN,
  //   assetInitialValue,
  //   assetsArguments,
  // );

  const sumAssetsTotalReserves = BigNumber(525619.23);
  const formattedTVL = BigNumber(324971.78);

  const interestRates: Record<string, BigNumber> = {
    xlm: BigNumber(5500000000000000000),
    usdc: BigNumber(7800000000000000000),
    eth: BigNumber(4200000000000000000),
  };

  const liquidityRates: Record<string, BigNumber> = {
    xlm: BigNumber(4000000000000000000),
    usdc: BigNumber(6700000000000000000),
    eth: BigNumber(2300000000000000000),
  };

  const totalReserves: Record<string, BigNumber> = {
    xlm: sumAssetsTotalReserves.div(BigNumber(2)),
    usdc: BigNumber(198232),
    eth: BigNumber(65000),
  };

  const totalBorrowed: Record<string, BigNumber> = {
    xlm: sumAssetsTotalReserves.minus(formattedTVL).div(BigNumber(2)),
    usdc: BigNumber(73235),
    eth: BigNumber(28900),
  };

  return (
    <>
      <div className='flex flex-col gap-6 md:hidden'>
        <div className='flex flex-col gap-4'>
          {assets.map(asset => (
            <div
              key={asset.symbol}
              className='card-gradient flex flex-col gap-4 rounded-lg px-[16px] pb-[26px] pt-[16px]'
            >
              <div className='flex justify-between'>
                <p className='subtitle2 text-[#E3E3E3]'>Asset</p>
                <div className='flex gap-2'>
                  <Image src={asset.icon} alt='' width={20} height={20} />
                  <p className='subtitle3 uppercase text-[#E3E3E3]'>{asset.symbol}</p>
                </div>
              </div>
              <div className='flex justify-between'>
                <p className='subtitle2 text-[#E3E3E3]'>Market Size</p>
                <p className='subtitle3 text-[#E3E3E3]'>
                  $
                  {formattedNumber(
                    // calculateToUsd(
                    //   totalReserves[asset.symbol] ?? BigNumber(0),
                    //   asset.exponents,
                    //   price[asset.symbol] ?? BigNumber(0),
                    // ).toNumber(),
                    (totalReserves[asset.symbol] ?? BigNumber(0)).toNumber(),
                  )}
                </p>
              </div>
              <div className='flex justify-between'>
                <p className='subtitle2 text-[#E3E3E3]'>Deposit APY</p>
                <p className='subtitle3 text-[#E3E3E3]'>
                  {displayAmount(
                    fromBaseUnitAmount(
                      liquidityRates[asset.symbol] ?? BigNumber(0),
                      EIGHTEEN_EXPONENT,
                    ).toNumber(),
                  )}
                  %
                </p>
              </div>
              <div className='flex justify-between'>
                <p className='subtitle2 text-[#E3E3E3]'>Total Borrowed</p>
                <p className='subtitle3 text-[#E3E3E3]'>
                  {formattedNumber(
                    // calculateToUsd(
                    //   totalBorrowed[asset.symbol] ?? BigNumber(0),
                    //   asset.exponents,
                    //   price[asset.symbol] ?? BigNumber(0),
                    // ).toNumber(),
                    (totalBorrowed[asset.symbol] ?? BigNumber(0)).toNumber(),
                  )}
                </p>
              </div>
              <div className='flex justify-between'>
                <p className='subtitle2 text-[#E3E3E3]'>Borrow APY</p>
                <p className='subtitle3 text-[#E3E3E3]'>
                  {displayAmount(
                    fromBaseUnitAmount(
                      interestRates[asset.symbol] ?? BigNumber(0),
                      EIGHTEEN_EXPONENT,
                    ).toNumber(),
                  )}
                  %
                </p>
              </div>
              <Link href={`${routesLinks.Markets}/${asset.symbol}`}>
                <Button className='mt-6 w-full'>More</Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className='hidden flex-col gap-2 rounded-lg px-5 pb-6 pt-4 md:flex'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-center'>Asset</TableHead>
              <TableHead className='text-center'>Market Size</TableHead>
              <TableHead className='text-center'>Deposit APY</TableHead>
              <TableHead className='text-center'>Total Borrowed</TableHead>
              <TableHead className='text-center'>Borrow APY</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map(asset => (
              <TableRow key={asset.symbol}>
                <TableCell className='flex items-center justify-center'>
                  <Link
                    href={`${routesLinks.Markets}/${asset.symbol}`}
                    className='flex items-center gap-2'
                  >
                    <Image src={asset.icon} alt='' width={20} height={20} />
                    <p className='uppercase'>{asset.symbol}</p>
                  </Link>
                </TableCell>
                <TableCell className='text-center'>
                  $
                  {formattedNumber(
                    // calculateToUsd(
                    //   totalReserves[asset.symbol] ?? BigNumber(0),
                    //   asset.exponents,
                    //   price[asset.symbol] ?? BigNumber(0),
                    // ).toNumber(),
                    (totalReserves[asset.symbol] ?? BigNumber(0)).toNumber(),
                  )}
                </TableCell>
                <TableCell className='text-center'>
                  {displayAmount(
                    fromBaseUnitAmount(
                      liquidityRates[asset.symbol] ?? BigNumber(0),
                      EIGHTEEN_EXPONENT,
                    ).toNumber(),
                  )}
                  %
                </TableCell>
                <TableCell className='text-center'>
                  {formattedNumber(
                    // calculateToUsd(
                    //   totalBorrowed[asset.symbol] ?? BigNumber(0),
                    //   asset.exponents,
                    //   price[asset.symbol] ?? BigNumber(0),
                    // ).toNumber(),
                    (totalBorrowed[asset.symbol] ?? BigNumber(0)).toNumber(),
                  )}
                </TableCell>
                <TableCell className='text-center'>
                  {displayAmount(
                    fromBaseUnitAmount(
                      interestRates[asset.symbol] ?? BigNumber(0),
                      EIGHTEEN_EXPONENT,
                    ).toNumber(),
                  )}
                  %
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
