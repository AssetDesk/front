import { Metadata } from 'next';
import { FadeTransition } from '../../components';
import { Balances, BorrowMarketTable, DepostMarketTable } from '../../containers';
import { generalMetadata } from '../../utils';

export const metadata: Metadata = {
  title: 'AssetDesk | Assets',
  ...generalMetadata,
};

export default function Page() {
  return (
    <FadeTransition>
      <div className='mt-10 flex flex-col gap-10 md:mt-[74px] md:gap-6'>
        <Balances />
        <div className='flex flex-col gap-6 md:flex-row md:gap-4'>
          <div className='flex-1'>
            <DepostMarketTable />
          </div>
          <div className='flex-1'>
            <BorrowMarketTable />
          </div>
        </div>
      </div>
    </FadeTransition>
  );
}
