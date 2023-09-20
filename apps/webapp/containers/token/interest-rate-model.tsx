import { LinearChart } from '../../components';

export const InterestRateModel = () => {
  return (
    <div className='grid grid-cols-12 gap-4'>
      <p className='subtitle1 col-span-12 md:col-span-2'>Interest rate model</p>
      <div className='col-span-12 flex flex-col  gap-6 md:col-span-10 md:gap-10'>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <p className='subtitle2 text-[#E3E3E3]'>Utilization Rate</p>
            {/* Info Icon replace */}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
            >
              <path
                d='M7.3335 6.00001H8.66683V4.66668H7.3335M8.00016 13.3333C5.06016 13.3333 2.66683 10.94 2.66683 8.00001C2.66683 5.06001 5.06016 2.66668 8.00016 2.66668C10.9402 2.66668 13.3335 5.06001 13.3335 8.00001C13.3335 10.94 10.9402 13.3333 8.00016 13.3333ZM8.00016 1.33334C7.12468 1.33334 6.25778 1.50578 5.44894 1.84081C4.6401 2.17584 3.90517 2.66691 3.28612 3.28596C2.03588 4.53621 1.3335 6.2319 1.3335 8.00001C1.3335 9.76812 2.03588 11.4638 3.28612 12.7141C3.90517 13.3331 4.6401 13.8242 5.44894 14.1592C6.25778 14.4942 7.12468 14.6667 8.00016 14.6667C9.76827 14.6667 11.464 13.9643 12.7142 12.7141C13.9645 11.4638 14.6668 9.76812 14.6668 8.00001C14.6668 7.12453 14.4944 6.25762 14.1594 5.44879C13.8243 4.63995 13.3333 3.90502 12.7142 3.28596C12.0952 2.66691 11.3602 2.17584 10.5514 1.84081C9.74255 1.50578 8.87564 1.33334 8.00016 1.33334ZM7.3335 11.3333H8.66683V7.33334H7.3335V11.3333Z'
                fill='#B0A8A8'
              />
            </svg>
          </div>
          <p className='number'>78.61%</p>
        </div>
        <LinearChart value1='Borrow APR, variable' value2='Utilization Rate' period={false} />
      </div>
    </div>
  );
};
