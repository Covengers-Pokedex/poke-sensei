import { getPokemonAllList } from '@/lib/api/api';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const useInfinityPokemons = () => {
  const [hasMore, setHasMore] = useState(true);

  const {
    data: allPokemonData,
    fetchNextPage: fetchAllPokemonNextPage,
    hasNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ['pokemon'],
    queryFn: ({ pageParam }) => getPokemonAllList({ offset: pageParam, limit: 20 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length >= 20) {
        return allPages.length * 20;
      }
      return undefined;
    },
  });
  useEffect(() => {
    if (hasNextPage === false) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [hasNextPage]);
  return { allPokemonData, fetchAllPokemonNextPage, hasMore };
};
export default useInfinityPokemons;
