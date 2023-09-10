import { Metadata } from 'next';
import { FadeTransition } from '../../../components';
import { AssetName, AssetTabs, BackButton } from '../../../containers';

interface Props {
  params: { slug: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const slug = params.slug;

  return {
    title: 'AssetDesk | Assets | ' + slug.toUpperCase(),
    description: 'Earn interest, borrow assets, and build applications.',
  };
}

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
