'use client';

import Image from 'next/image';
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'ui';
import { assets } from '../../utils';
import Link from 'next/link';
import { useReadContractMultiAssets } from '../../hooks/read-contract-multi-assets';
import { CONTRACT_ADDRESS, EIGHTEEN_EXPONENT, USDC_EXPONENT } from '../../utils/constants';
import { ContractMethods } from '../../types/contract';
import BigNumber from 'bignumber.js';
import { xdr } from 'soroban-client';
import { formatNumber } from '../../utils/format-number';
import { formatValue } from '../../utils/format-value';

const calculateMarketSize = (totalReserves: BigNumber, exponent: number, price: BigNumber) => {
  const formattedTotalReserves = formatValue(totalReserves, exponent);
  const formattedPrice = formatValue(price, USDC_EXPONENT);
  return formattedTotalReserves.multipliedBy(formattedPrice);
};

const initialValue = { xlm: BigNumber(0), atk: BigNumber(0), btk: BigNumber(0) };

export const LandingTable = () => {
  const { data: liquidityRates } = useReadContractMultiAssets<
    Record<string, BigNumber | undefined>
  >(CONTRACT_ADDRESS, ContractMethods.GET_LIQUIDITY_RATE, initialValue, {
    xlm: [xdr.ScVal.scvSymbol('xlm')],
    atk: [xdr.ScVal.scvSymbol('atk')],
    btk: [xdr.ScVal.scvSymbol('btk')],
  });

  const { data: interestRates } = useReadContractMultiAssets<Record<string, BigNumber | undefined>>(
    CONTRACT_ADDRESS,
    ContractMethods.GET_INTEREST_RATE,
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
                  {formatNumber(
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
                  {formatNumber(
                    formatValue(
                      liquidityRates[asset.symbol] ?? BigNumber(0),
                      EIGHTEEN_EXPONENT,
                    ).toNumber(),
                  )}
                  %
                </p>
              </div>
              <div className='flex justify-between'>
                <p className='subtitle2 text-[#E3E3E3]'>Total Borrowed</p>
                <p className='subtitle3 text-[#E3E3E3]'>$ 121.6M</p>
              </div>
              <div className='flex justify-between'>
                <p className='subtitle2 text-[#E3E3E3]'>Borrow APY</p>
                <p className='subtitle3 text-[#E3E3E3]'>
                  {formatNumber(
                    formatValue(
                      interestRates[asset.symbol] ?? BigNumber(0),
                      EIGHTEEN_EXPONENT,
                    ).toNumber(),
                  )}
                  %
                </p>
              </div>
              <Link href={`/asset/${asset.symbol}`}>
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
                  <Link href={`/asset/${asset.symbol}`} className='flex items-center gap-2'>
                    <Image src={asset.icon} alt='' width={20} height={20} />
                    <p>{asset.symbol}</p>
                  </Link>
                </TableCell>
                <TableCell className='text-center'>
                  $
                  {formatNumber(
                    calculateMarketSize(
                      totalReserves[asset.symbol] ?? BigNumber(0),
                      asset.exponents,
                      price[asset.symbol] ?? BigNumber(0),
                    ).toNumber(),
                  )}
                </TableCell>
                <TableCell className='text-center'>
                  {formatNumber(
                    formatValue(
                      liquidityRates[asset.symbol] ?? BigNumber(0),
                      EIGHTEEN_EXPONENT,
                    ).toNumber(),
                  )}
                  %
                </TableCell>
                <TableCell className='text-center'>$ 121.6M</TableCell>
                <TableCell className='text-center'>
                  {formatNumber(
                    formatValue(
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
