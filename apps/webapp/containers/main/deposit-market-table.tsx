'use client';
import { useSorobanReact } from '@soroban-react/core';
import BigNumber from 'bignumber.js';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { Address, xdr } from 'soroban-client';
import { Button, Switch, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'ui';
import { useReadContractMultiAssets } from '../../hooks/read-contract-multi-assets';
import { useWriteContract } from '../../hooks/write-contract';
import { ContractMethods } from '../../types/contract';
import { assetInitialValue, assets, assetsArguments } from '../../utils';
import { displayAmount, fromBaseUnitAmount } from '../../utils/amount';
import { CONTRACT_ADDRESS, EIGHTEEN_EXPONENT } from '../../utils/constants';

export const DepostMarketTable = () => {
  const router = useRouter();
  const { address } = useSorobanReact();

  const args = useMemo(() => {
    if (!address) return [];
    return [new Address(address).toScVal()];
  }, [address]);

  const navigateToAsset = (asset: string) => () => router.push(`/asset/${asset.toLowerCase()}`);

  const { data: liquidityRates } = useReadContractMultiAssets<
    Record<string, BigNumber | undefined>
  >(CONTRACT_ADDRESS, ContractMethods.GET_LIQUIDITY_RATE, assetInitialValue, assetsArguments);

  const { data: deposits } = useReadContractMultiAssets<Record<string, BigNumber | undefined>>(
    CONTRACT_ADDRESS,
    ContractMethods.GET_DEPOSIT,
    assetInitialValue,
    {
      //TODO add dynamic assets
      xlm: [...args, xdr.ScVal.scvSymbol('xlm')],
      usdc: [...args, xdr.ScVal.scvSymbol('usdc')],
      eth: [...args, xdr.ScVal.scvSymbol('eth')],
    },
    Boolean(address),
  );

  const { data: collateral, refetch: refetchCollateral } = useReadContractMultiAssets<
    Record<string, boolean | undefined>
  >(
    CONTRACT_ADDRESS,
    ContractMethods.USER_DEPOSIT_AS_COLLATERAL,
    { xlm: false, usdc: false, eth: false },
    {
      //TODO add dynamic assets
      xlm: [...args, xdr.ScVal.scvSymbol('xlm')],
      usdc: [...args, xdr.ScVal.scvSymbol('usdc')],
      eth: [...args, xdr.ScVal.scvSymbol('eth')],
    },
    Boolean(address),
  );

  const { write } = useWriteContract();

  const toggleColateral = (asset: string) => async () => {
    if (!address) return;
    await write(CONTRACT_ADDRESS, ContractMethods.TOGGLE_COLLATERAL_SETTING, [
      ...args,
      xdr.ScVal.scvSymbol(asset),
    ]);

    await refetchCollateral();
  };

  return (
    <>
      <div className='flex flex-col gap-6 md:hidden'>
        <p className='h2'>Deposit Markets</p>
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
                <p className='subtitle2 text-[#E3E3E3]'>Deposit</p>
                <p className='subtitle3 text-[#E3E3E3]'>
                  {displayAmount(
                    fromBaseUnitAmount(
                      deposits[asset.symbol] ?? BigNumber(0),
                      asset.exponents,
                    ).toNumber(),
                  )}{' '}
                  {asset.symbol}
                </p>
              </div>
              <div className='flex justify-between'>
                <p className='subtitle2 text-[#E3E3E3]'>Collateral</p>
                <Switch
                  onClick={e => {
                    e.stopPropagation();
                    void toggleColateral(asset.symbol)();
                  }}
                  checked={Boolean(collateral[asset.symbol])}
                />
              </div>
              <Button className='mt-6 w-full' onClick={navigateToAsset(asset.symbol)}>
                More
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className='card-gradient hidden flex-col gap-2 rounded-lg px-5 pb-6 pt-4 md:flex'>
        <p className='h2'>Deposit Markets</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Assets</TableHead>
              <TableHead className='text-right'>APY</TableHead>
              <TableHead className='text-center'>Deposit</TableHead>
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
                  {displayAmount(
                    fromBaseUnitAmount(
                      liquidityRates[asset.symbol] ?? BigNumber(0),
                      EIGHTEEN_EXPONENT,
                    ).toNumber(),
                  )}
                  %
                </TableCell>
                <TableCell className='text-center'>
                  {displayAmount(
                    fromBaseUnitAmount(
                      deposits[asset.symbol] ?? BigNumber(0),
                      asset.exponents,
                    ).toNumber(),
                  )}{' '}
                  {asset.symbol}
                </TableCell>
                <TableCell className='text-center'>
                  <Switch
                    onClick={e => {
                      e.stopPropagation();
                      void toggleColateral(asset.symbol)();
                    }}
                    checked={Boolean(collateral[asset.symbol])}
                    disabled={!asset.collateral}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
