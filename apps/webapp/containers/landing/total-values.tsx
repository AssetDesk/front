import React from 'react';

export const TotalValues = () => {
  return (
    <div className='mb-[100px] mt-20 flex flex-col gap-6 md:mb-[132px] md:mt-[272px] md:flex-row md:gap-4'>
      <div className='card-gradient-secondary flex flex-1 flex-col items-center justify-center gap-2 rounded-lg py-7 md:py-12'>
        <p className='subtitle1 text-[#E3E3E3]'>Market Size</p>
        <p className='title'>$1,711,966,040.39</p>
      </div>
      <div className='card-gradient-secondary flex flex-1 flex-col items-center justify-center gap-2 rounded-lg py-7 md:py-12'>
        <p className='subtitle1 text-[#E3E3E3]'>Total Borrowed</p>
        <p className='title'>$777,439,456.51</p>
      </div>
      <div className='card-gradient-secondary flex flex-1 flex-col items-center justify-center gap-2 rounded-lg py-7 md:py-12'>
        <p className='subtitle1 text-[#E3E3E3]'>Total Liquidity</p>
        <p className='title'>$568,536,501.46</p>
      </div>
    </div>
  );
};
