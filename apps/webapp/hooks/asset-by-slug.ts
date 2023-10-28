import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { assets } from '../utils';

export const useAssetBySlug = () => {
  const { slug } = useParams() as { slug: string };
  const asset = useMemo(() => {
    return assets.find(i => i.address === slug.toUpperCase());
  }, [slug]);

  return asset;
};
