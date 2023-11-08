import { FadeTransition } from '../../components';
import { BorrowInfo } from './borrow-info';
import { InterestRateModel } from './interest-rate-model';
import { DepositInfo } from './deposit-info';

export const ReserveConfiguration = () => {
  return (
    <FadeTransition>
      <div className='flex flex-col gap-[18px]'>
        <p className='h2'>Reserve status & configuration</p>
        <div className='card-gradient flex flex-col gap-10 rounded-lg px-4 pb-24 pt-4 md:gap-14 md:px-[30px] md:pb-[72px] md:pt-5'>
          <DepositInfo />
          <BorrowInfo />
          <InterestRateModel />
        </div>
      </div>
    </FadeTransition>
  );
};
