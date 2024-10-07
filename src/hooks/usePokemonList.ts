import { getPokemonAllList } from '@/lib/api/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';

const usePokemonList = () => {
  const [hasMore, setHasMore] = useState(true);

  const { data: pokemonData, fetchNextPage } = useInfiniteQuery({
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
  return { pokemonData, fetchNextPage, hasMore };
};
export default usePokemonList;
