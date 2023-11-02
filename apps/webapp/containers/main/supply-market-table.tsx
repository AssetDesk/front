'use client';
import { useSorobanReact } from '@soroban-react/core';
import BigNumber from 'bignumber.js';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { Address, xdr } from 'soroban-client';
import { Button, Switch, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'ui';
import { useReadContractMultiAssets } from '../../hooks/read-contract-multi-assets';
import { ContractMethods } from '../../types/contract';
import { assets } from '../../utils';
import { CONTRACT_ADDRESS, EIGHTEEN_EXPONENT } from '../../utils/constants';
import { formatNumber } from '../../utils/format-number';
import { formatValue } from '../../utils/format-value';

const initialValue = { xlm: BigNumber(0), atk: BigNumber(0), btk: BigNumber(0) };
export const SupplyMarketTable = () => {
  const router = useRouter();
  const { address } = useSorobanReact();

  const args = useMemo(() => {
    if (!address) return [];
    return [new Address(address).toScVal()];
  }, [address]);

  const navigateToAsset = (asset: string) => () => router.push(`/asset/${asset.toLowerCase()}`);

  const { data: liquidityRates } = useReadContractMultiAssets<
    Record<string, BigNumber | undefined>
  >(CONTRACT_ADDRESS, ContractMethods.GET_LIQUIDITY_RATE, initialValue, {
    xlm: [xdr.ScVal.scvSymbol('xlm')],
    atk: [xdr.ScVal.scvSymbol('atk')],
    btk: [xdr.ScVal.scvSymbol('btk')],
  });

  const { data: deposits } = useReadContractMultiAssets<Record<string, BigNumber | undefined>>(
    CONTRACT_ADDRESS,
    ContractMethods.GET_DEPOSIT,
    { xlm: BigNumber(0), atk: BigNumber(0), btk: BigNumber(0) },
    {
      xlm: [...args, xdr.ScVal.scvSymbol('xlm')],
      atk: [...args, xdr.ScVal.scvSymbol('atk')],
      btk: [...args, xdr.ScVal.scvSymbol('btk')],
    },
    Boolean(address),
  );

  return (
    <>
      <div className='flex flex-col gap-6 md:hidden'>
        <p className='h2'>Supply Markets</p>
        <div className='flex flex-col gap-4'>
          {assets.map(asset => (
            <div
              key={asset.symbol}
              className='card-gradient flex flex-col gap-4 rounded-lg px-[16px] pb-[26px] pt-[16px]'
            >
              <div className='flex justify-between'>
                <p className='subtitle2 text-[#E3E3E3]'>Assets</p>
                <div className='flex gap-2'>
                  <Image src={asset.icon} alt='' width={20} height={20} />
                  <p className='subtitle3 text-[#E3E3E3]'>{asset.symbol}</p>
                </div>
              </div>
              <div className='flex justify-between'>
                <p className='subtitle2 text-[#E3E3E3]'>APY</p>
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
                <p className='subtitle2 text-[#E3E3E3]'>Supply</p>
                <p className='subtitle3 text-[#E3E3E3]'>
                  {formatNumber(
                    formatValue(deposits[asset.symbol] ?? BigNumber(0), asset.exponents).toNumber(),
                  )}{' '}
                  {asset.symbol}
                </p>
              </div>
              <div className='flex justify-between'>
                <p className='subtitle2 text-[#E3E3E3]'>Collateral</p>
                <Switch />
              </div>
              <Button className='mt-6 w-full' onClick={navigateToAsset(asset.symbol)}>
                More
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className='card-gradient hidden flex-col gap-2 rounded-lg px-5 pb-6 pt-4 md:flex'>
        <p className='h2'>Supply Markets</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Assets</TableHead>
              <TableHead className='text-right'>APY</TableHead>
              <TableHead className='text-center'>Supply</TableHead>
              <TableHead className='text-center'>Collateral</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map(asset => (
              <TableRow
                key={asset.symbol}
                className='cursor-pointer'
                onClick={navigateToAsset(asset.symbol)}
              >
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Image src={asset.icon} alt='' width={20} height={20} />
                    <p>{asset.symbol}</p>
                  </div>
                </TableCell>
                <TableCell className='text-right'>
                  {formatNumber(
                    formatValue(liquidityRates[asset.symbol] ?? BigNumber(0), EIGHTEEN_EXPONENT).toNumber(),
                  )}
                  %
                </TableCell>
                <TableCell className='text-center'>
                  {formatNumber(
                    formatValue(deposits[asset.symbol] ?? BigNumber(0), asset.exponents).toNumber(),
                  )}{' '}
                  {asset.symbol}
                </TableCell>
                <TableCell className='text-center'>
                  <Switch onClick={e => e.stopPropagation()} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
