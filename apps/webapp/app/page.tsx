import { FadeTransition } from '../components';
import { Balances, BorrowMarketTable, SupplyMarketTable } from '../containers';

export default function Page() {
  return (
    <FadeTransition>
      <div className='flex flex-col gap-10 md:gap-6 mt-10 md:mt-[74px]'>
        <Balances />
        <div className='flex flex-col gap-6 md:gap-4 md:flex-row'>
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
