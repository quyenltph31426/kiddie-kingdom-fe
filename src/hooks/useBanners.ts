import { useBanners } from '@/api/banner/queries';
import type { IBanner } from '@/api/banner/types';
import { useEffect, useState } from 'react';

export const useActiveBanners = (limit?: number) => {
  const [banners, setBanners] = useState<IBanner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data, isFetching } = useBanners({
    variables: {
      page: 1,
      limit: limit || 10,
    },
  });

  useEffect(() => {
    if (data?.items) {
      setBanners(data.items);
      setIsLoading(false);
    }
  }, [data]);

  return {
    banners,
    isLoading: isLoading || isFetching,
  };
};
