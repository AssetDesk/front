'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button, Switch, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'ui';
import { assets } from '../../utils';

export const SupplyMarketTable = () => {
  const router = useRouter();
  const navigateToAsset = (asset: string) => () => router.push(`/asset/${asset.toLowerCase()}`);
  return (
    <>
      <div className='flex flex-col gap-6 md:hidden'>
        <p className='h2'>Supply Markets</p>
        <div className='flex flex-col gap-4'>
          {assets.map(i => (
            <div
              key={i.address}
              className='card-gradient flex flex-col gap-4 rounded-lg px-[16px] pb-[26px] pt-[16px]'
            >
              <div className='flex justify-between'>
                <p className='subtitle2 text-[#E3E3E3]'>Assets</p>
                <div className='flex gap-2'>
                  <Image src={i.icon} alt='' width={20} height={20} />
                  <p className='subtitle3 text-[#E3E3E3]'>{i.symbol}</p>
                </div>
              </div>
              <div className='flex justify-between'>
                <p className='subtitle2 text-[#E3E3E3]'>APY</p>
                <p className='subtitle3 text-[#E3E3E3]'>2.36%</p>
              </div>
              <div className='flex justify-between'>
                <p className='subtitle2 text-[#E3E3E3]'>Wallet</p>
                <p className='subtitle3 text-[#E3E3E3]'>0 {i.symbol}</p>
              </div>
              <div className='flex justify-between'>
                <p className='subtitle2 text-[#E3E3E3]'>Collateral</p>
                <Switch />
              </div>
              <Button className='mt-6 w-full' onClick={navigateToAsset(i.symbol)}>
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
              <TableHead className='text-center'>Wallet</TableHead>
              <TableHead className='text-center'>Collateral</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map(i => (
              <TableRow
                key={i.address}
                className='cursor-pointer'
                onClick={navigateToAsset(i.symbol)}
              >
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Image src={i.icon} alt='' width={20} height={20} />
                    <p>{i.symbol}</p>
                  </div>
                </TableCell>
                <TableCell className='text-right'>2.36%</TableCell>
                <TableCell className='text-center'>0 {i.symbol}</TableCell>
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
