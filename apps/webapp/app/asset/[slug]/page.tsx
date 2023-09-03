import { FadeTransition } from '../../../components';
import { AssetName, AssetTabs, BackButton } from '../../../containers';

export default function Page() {
  return (
    <FadeTransition>
      <div className='mt-10 flex flex-col md:mt-5'>
        <BackButton />
        <div className='mb-9 mt-6 md:mb-12 md:mt-4'>
          <AssetName />
        </div>
        <AssetTabs />
      </div>
    </FadeTransition>
  );
}
