'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'ui';
import { assets } from '../../utils';

export const LandingTable = () => {
  const router = useRouter();
  const navigateToAsset = (asset: string) => () => router.push(`/asset/${asset.toLowerCase()}`);
  return (
    <>
      <div className='flex flex-col gap-6 md:hidden'>
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
                <p className='subtitle2 text-[#E3E3E3]'>Market Size</p>
                <p className='subtitle3 text-[#E3E3E3]'>$35.86M</p>
              </div>
              <div className='flex justify-between'>
                <p className='subtitle2 text-[#E3E3E3]'>Deposit APY</p>
                <p className='subtitle3 text-[#E3E3E3]'>2.36%</p>
              </div>
              <div className='flex justify-between'>
                <p className='subtitle2 text-[#E3E3E3]'>Total Borrowed</p>
                <p className='subtitle3 text-[#E3E3E3]'>$ 121.6M</p>
              </div>
              <div className='flex justify-between'>
                <p className='subtitle2 text-[#E3E3E3]'>Borrow APY</p>
                <p className='subtitle3 text-[#E3E3E3]'>-0.47%</p>
              </div>
              <Button className='mt-6 w-full' onClick={navigateToAsset(i.symbol)}>
                More
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className='hidden flex-col gap-2 rounded-lg px-5 pb-6 pt-4 md:flex'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-center'>Market Size</TableHead>
              <TableHead className='text-center'>Wallet</TableHead>
              <TableHead className='text-center'>Deposit APY</TableHead>
              <TableHead className='text-center'>Total Borrowed</TableHead>
              <TableHead className='text-center'>Borrow APY</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map(i => (
              <TableRow
                key={i.address}
                className='cursor-pointer'
                onClick={navigateToAsset(i.symbol)}
              >
                <TableCell className='flex items-center justify-center'>
                  <div className='flex items-center gap-2'>
                    <Image src={i.icon} alt='' width={20} height={20} />
                    <p>{i.symbol}</p>
                  </div>
                </TableCell>
                <TableCell className='text-center'>$35.86M</TableCell>
                <TableCell className='text-center'>2.36%</TableCell>
                <TableCell className='text-center'>$ 121.6M</TableCell>
                <TableCell className='text-center'>-0.47%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
