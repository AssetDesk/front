import { FadeTransition } from '../../../components';
import { AssetName, AssetTabs, BackButton } from '../../../containers';

export default function Page() {
  return (
    <FadeTransition>
      <div className='flex flex-col mt-10 md:mt-5'>
        <BackButton />
        <div className='mt-6 md:mt-4 mb-9 md:mb-12'>
          <AssetName />
        </div><AssetTabs />
      </div>
    </FadeTransition>
  );
}
