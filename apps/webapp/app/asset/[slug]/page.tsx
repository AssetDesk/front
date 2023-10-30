'use client';
import { FadeTransition } from '../../../components';
import { AssetName, AssetTabs, BackButton } from '../../../containers';
import { useAssetBySlug } from '../../../hooks/asset-by-slug';
import { redirect } from 'next/navigation';

//TODO add client metadata
// export function generateMetadata({ params }: Props): Metadata {
//   const slug = params.slug;

//   return {
//     title: 'AssetDesk | Assets | ' + slug.toUpperCase(),
//     ...generalMetadata,
//   };
// }

export default function Page() {
  const asset = useAssetBySlug();

  if (!asset) {
    return redirect('/asset');
  }
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
