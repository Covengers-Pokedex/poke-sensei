import { getPokemonAllList } from '@/lib/api/api';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';

const usePokemonList = () => {
  const [hasMore, setHasMore] = useState(true);

  const { data: allPokemonData, fetchNextPage: fetchAllPokemonNextPage } = useSuspenseInfiniteQuery({
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

  const { data: pokemonDataByType, fetchNextPage: fetchPokemonByTypeNextPage } = useSuspenseInfiniteQuery({
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

  return { allPokemonData, fetchAllPokemonNextPage, hasMore };
};
export default usePokemonList;
