'use client';

import BigNumber from 'bignumber.js';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'ui';
import { useReadContractMultiAssets } from '../../hooks/read-contract-multi-assets';
import { ContractMethods } from '../../types/contract';
import {
  assetInitialValue,
  assets,
  assetsArguments,
  formattedNumber,
  routesLinks,
} from '../../utils';
import { displayAmount, fromBaseUnitAmount } from '../../utils/amount';
import { CONTRACT_ADDRESS, EIGHTEEN_EXPONENT, USDC_EXPONENT } from '../../utils/constants';

const calculateMarketSize = (totalReserves: BigNumber, exponent: number, price: BigNumber) => {
  const formattedTotalReserves = fromBaseUnitAmount(totalReserves, exponent);
  const formattedPrice = fromBaseUnitAmount(price, USDC_EXPONENT);
  return formattedTotalReserves.multipliedBy(formattedPrice);
};

export const LandingTable = () => {
  const { data: liquidityRates } = useReadContractMultiAssets<
    Record<string, BigNumber | undefined>
  >(CONTRACT_ADDRESS, ContractMethods.GET_LIQUIDITY_RATE, assetInitialValue, assetsArguments);

  const { data: interestRates } = useReadContractMultiAssets<Record<string, BigNumber | undefined>>(
    CONTRACT_ADDRESS,
    ContractMethods.GET_INTEREST_RATE,
    assetInitialValue,
    assetsArguments,
  );

  const { data: price } = useReadContractMultiAssets<Record<string, BigNumber | undefined>>(
    CONTRACT_ADDRESS,
    ContractMethods.GET_PRICE,
    assetInitialValue,
    assetsArguments,
  );

  const { data: totalReserves } = useReadContractMultiAssets<Record<string, BigNumber | undefined>>(
    CONTRACT_ADDRESS,
    ContractMethods.GET_TOTAL_RESERVES_BY_TOKEN,
    assetInitialValue,
    assetsArguments,
  );

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
                  <p className='subtitle3 text-[#E3E3E3]'>{asset.symbol}</p>
                </div>
              </div>
              <div className='flex justify-between'>
                <p className='subtitle2 text-[#E3E3E3]'>Market Size</p>
                <p className='subtitle3 text-[#E3E3E3]'>
                  $
                  {formattedNumber(
                    calculateMarketSize(
                      totalReserves[asset.symbol] ?? BigNumber(0),
                      asset.exponents,
                      price[asset.symbol] ?? BigNumber(0),
                    ).toNumber(),
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
                <p className='subtitle3 text-[#E3E3E3]'>$ {formattedNumber(121600000)}</p>
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
                    <p>{asset.symbol}</p>
                  </Link>
                </TableCell>
                <TableCell className='text-center'>
                  $
                  {formattedNumber(
                    calculateMarketSize(
                      totalReserves[asset.symbol] ?? BigNumber(0),
                      asset.exponents,
                      price[asset.symbol] ?? BigNumber(0),
                    ).toNumber(),
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
                <TableCell className='text-center'>$ {formattedNumber(121600000)}</TableCell>
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
