import { getPokemonAllList } from '@/lib/api/api';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';

const useInfinityPokemon = () => {
  const [hasMore, setHasMore] = useState(true);

  const {
    data: allPokemonData,
    fetchNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ['pokemon'],
    queryFn: ({ pageParam }) => getPokemonAllList({ offset: pageParam, limit: 20 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length >= 20) {
        return allPages.length * 20;
      }
      setHasMore(false);
      return undefined;
    },
  });

  return { allPokemonData, fetchNextPage, hasMore, isFetchingNextPage };
};
export default useInfinityPokemon;
