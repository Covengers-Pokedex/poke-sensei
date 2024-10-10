import { getPokemonTypeList } from '@/lib/api/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

function useInfinityTypePokemons() {
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
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['pokemon', activedTypeNum],
    queryFn: ({ pageParam }) => getPokemonTypeList({ number: activedTypeNum, offset: pageParam, limit: 20 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage && lastPage.length >= 20) {
        return allPages.length * 20;
      }
      return undefined;
    },
    enabled: activedTypeNum !== null,
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
  };
}
export default useInfinityTypePokemons;
