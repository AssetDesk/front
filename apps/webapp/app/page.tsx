import { FadeTransition } from '../components';
import { Balances, BorrowMarketTable, SupplyMarketTable } from '../containers';

export default function Page() {
  return (
    <FadeTransition>
      <div className='mt-10 flex flex-col gap-10 md:mt-[74px] md:gap-6'>
        <Balances />
        <div className='flex flex-col gap-6 md:flex-row md:gap-4'>
          <div className='flex-1'>
            <SupplyMarketTable />
          </div>
          <div className='flex-1'>
            <BorrowMarketTable />
          </div>
        </div>
      </div>
    </FadeTransition>
  );
}
