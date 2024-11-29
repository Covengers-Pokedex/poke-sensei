import { POKEMON_QUERY_KEY } from '@/constants/queryKeys';
import { getPokemonAllList } from '@/lib/api/api';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';

//파일명 변경 usePokemonList =>
const useInfinityPokemon = () => {
  const { language } = useLanguageStore();
  const [hasMore, setHasMore] = useState(true);

  const {
    data: allPokemonData,
    fetchNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: [POKEMON_QUERY_KEY, language],
    queryFn: ({ pageParam }) => getPokemonAllList({ offset: pageParam, limit: 20, language }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length >= 20) {
        return allPages.length * 20;
      }
      setHasMore(false);
      return undefined;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { allPokemonData, fetchNextPage, hasMore, isFetchingNextPage };
};
export default useInfinityPokemon;
