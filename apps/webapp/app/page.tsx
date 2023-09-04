import { FadeTransition } from '../components';
import { Hero, LandingTable, TotalValues } from '../containers';

export default function Page() {
  return (
    <FadeTransition className='bg-[url("/sm-bg.svg")] bg-right-top bg-no-repeat md:bg-[url("/lg-bg.svg")] md:bg-top'>
      <div className='mt-28 flex flex-col md:mt-72'>
        <Hero />
        <TotalValues />
        <LandingTable />
      </div>
    </FadeTransition>
  );
}
