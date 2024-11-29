import { POKEMON_QUERY_KEY } from '@/constants/queryKeys';
import { getPokemonTypeList } from '@/lib/api/api';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

function useInfinityTypePokemons() {
  const { language } = useLanguageStore();
  //타입별 데이터 관리
  const [hasMoreType, setHasMoreType] = useState(false);
  const [activedTypeNum, setActivedTypeNum] = useState<number | null>(null);
  const handleResetButton = () => {
    setActivedTypeNum(null);
  };

  const handleTypeButton = (typeNum: number) => {
    setActivedTypeNum(prev => (prev === typeNum ? null : typeNum));
  };

  const {
    data: typePokemonData,
    fetchNextPage: fetchTypePokemonNextPage,
    isFetching,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [POKEMON_QUERY_KEY, activedTypeNum, language],
    queryFn: async ({ pageParam }) => {
      if (activedTypeNum === null) {
        return [];
      }
      const data = await getPokemonTypeList({ number: activedTypeNum, offset: pageParam, limit: 20, language });
      return data?.pokemonList;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage && lastPage.length >= 20) {
        return allPages.length * 20;
      }
      return undefined;
    },
    enabled: activedTypeNum !== null,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  useEffect(() => {
    if (hasNextPage === false) {
      setHasMoreType(false);
    } else {
      setHasMoreType(true);
    }
  }, [hasNextPage]);
  return {
    activedTypeNum,
    handleResetButton,
    handleTypeButton,
    typePokemonData,
    fetchTypePokemonNextPage,
    hasMoreType,
    isFetching,
  };
}
export default useInfinityTypePokemons;
