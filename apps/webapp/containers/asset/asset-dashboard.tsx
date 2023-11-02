export const AssetDashboard = () => {
  return (
    <div className='card-gradient grid grid-cols-2 gap-4 rounded-lg px-4 pb-5 pt-4 md:grid-cols-7 md:gap-6 md:p-[30px]'>
      <div className='grid-row-2 grid gap-1 md:text-center'>
        <p className='subtitle2 text-[#E3E3E3]'>Reserve Size</p>
        <p className='number'>$521.26M</p>
      </div>
      <div
        className='grid-row-2 grid gap-1
       md:text-center'
      >
        <p className='subtitle2 text-[#E3E3E3]'>Available Liquidity</p>
        <p className='number'>$521.26</p>
      </div>
      <div
        className='grid-row-2 grid gap-1
       md:text-center'
      >
        <p className='subtitle2 text-[#E3E3E3]'>Utilization Rate</p>
        <p className='number'>82.50%</p>
      </div>
      <div
        className='grid-row-2 grid gap-1 md:text-center
      '
      >
        <p className='subtitle2 text-[#E3E3E3]'>Price</p>
        <p className='number'>$9.02</p>
      </div>
      <div
        className='grid-row-2 grid gap-1 md:text-center
      '
      >
        <p className='subtitle2 text-[#E3E3E3]'>Deposit APY</p>
        <p className='number'>2.67%</p>
      </div>
      <div
        className='grid-row-2 grid gap-1 md:text-center
      '
      >
        <p className='subtitle2 text-[#E3E3E3]'>Total Borrowed</p>
        <p className='number'>$1,931.49</p>
      </div>
      <div
        className='grid-row-2 grid gap-1 md:text-center
      '
      >
        <p className='subtitle2 text-[#E3E3E3]'>Borrow APY</p>
        <p className='number'>106.90%</p>
      </div>
    </div>
  );
};
