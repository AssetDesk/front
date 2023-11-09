'use client';
import { useSorobanReact } from '@soroban-react/core';
import BigNumber from 'bignumber.js';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { Address, xdr } from 'soroban-client';
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'ui';
import { useReadContractMultiAssets } from '../../hooks/read-contract-multi-assets';
import { ContractMethods } from '../../types/contract';
import { assetInitialValue, assets, assetsArguments, formattedNumber } from '../../utils';
import { displayAmount, fromBaseUnitAmount } from '../../utils/amount';
import { CONTRACT_ADDRESS, EIGHTEEN_EXPONENT, USDC_EXPONENT } from '../../utils/constants';

export const BorrowMarketTable = () => {
  const router = useRouter();
  const { address } = useSorobanReact();

  const args = useMemo(() => {
    if (!address) return [];
    return [new Address(address).toScVal()];
  }, [address]);

  const { data: interestRates } = useReadContractMultiAssets<Record<string, BigNumber | undefined>>(
    CONTRACT_ADDRESS,
    ContractMethods.GET_INTEREST_RATE,
    assetInitialValue,
    assetsArguments,
  );

  const { data: borrows } = useReadContractMultiAssets<Record<string, BigNumber | undefined>>(
    CONTRACT_ADDRESS,
    ContractMethods.GET_USER_BORROW_AMOUNT_WITH_INTEREST,
    assetInitialValue,
    {
      //TODO add dynamic assets
      xlm: [...args, xdr.ScVal.scvSymbol('xlm')],
      usdc: [...args, xdr.ScVal.scvSymbol('usdc')],
      eth: [...args, xdr.ScVal.scvSymbol('eth')],
    },
    Boolean(address),
  );

  const { data: availableLiquiduty } = useReadContractMultiAssets<
    Record<string, BigNumber | undefined>
  >(
    CONTRACT_ADDRESS,
    ContractMethods.GET_AVAILABLE_LIQUIDITY_BY_TOKEN,
    assetInitialValue,
    assetsArguments,
  );

  const { data: price } = useReadContractMultiAssets<Record<string, BigNumber | undefined>>(
    CONTRACT_ADDRESS,
    ContractMethods.GET_PRICE,
    assetInitialValue,
    assetsArguments,
  );

  const liquidity = useMemo(() => {
    const obj: Record<string, number> = {};
    assets.forEach(asset => {
      const formattedLiquidity = fromBaseUnitAmount(
        availableLiquiduty[asset.symbol] ?? BigNumber(0),
        asset.exponents,
      );
      const formattedPrice = fromBaseUnitAmount(price[asset.symbol] ?? BigNumber(0), USDC_EXPONENT);

      obj[asset.symbol] = formattedLiquidity.multipliedBy(formattedPrice).toNumber();
    });

    return obj;
  }, [availableLiquiduty, price]);

  const navigateToAsset = (asset: string) => () => router.push(`/asset/${asset.toLowerCase()}`);

  return (
    <>
      <div className='flex flex-col gap-6 md:hidden'>
        <p className='h2'>Borrow Markets</p>
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
                      interestRates[asset.symbol] ?? BigNumber(0),
                      EIGHTEEN_EXPONENT,
                    ).toNumber(),
                  )}
                  %
                </p>
              </div>
              <div className='flex justify-between'>
                <p className='subtitle2 text-[#E3E3E3]'>Borrow</p>
                <p className='subtitle3 text-[#E3E3E3]'>
                  {displayAmount(
                    fromBaseUnitAmount(
                      borrows[asset.symbol] ?? BigNumber(0),
                      asset.exponents,
                    ).toNumber(),
                  )}{' '}
                  {asset.symbol}
                </p>
              </div>
              <div className='flex justify-between'>
                <p className='subtitle2 text-[#E3E3E3]'>Liquidity</p>
                <p className='subtitle3 text-[#E3E3E3]'>
                  $
                  {formattedNumber(
                    fromBaseUnitAmount(
                      availableLiquiduty[asset.symbol] ?? BigNumber(0),
                      asset.exponents,
                    ).toNumber(),
                  )}
                </p>
              </div>
              <Button className='mt-6 w-full' onClick={navigateToAsset(asset.symbol)}>
                More
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className='card-gradient hidden flex-col gap-2 rounded-lg px-5 pb-6 pt-4 md:flex'>
        <p className='h2'>Borrow Markets</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Assets</TableHead>
              <TableHead className='text-right'>APY</TableHead>
              <TableHead className='text-center'>Borrow</TableHead>
              <TableHead className='text-center'>Liquidity</TableHead>
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
                      interestRates[asset.symbol] ?? BigNumber(0),
                      EIGHTEEN_EXPONENT,
                    ).toNumber(),
                  )}
                  %
                </TableCell>
                <TableCell className='text-center'>
                  {displayAmount(
                    fromBaseUnitAmount(
                      borrows[asset.symbol] ?? BigNumber(0),
                      asset.exponents,
                    ).toNumber(),
                  )}{' '}
                  {asset.symbol}
                </TableCell>
                <TableCell className='text-center'>
                  ${formattedNumber(liquidity[asset.symbol] ?? 0)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
