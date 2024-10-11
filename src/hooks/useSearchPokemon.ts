import { getPokemonInfo } from '@/lib/api/api';
import { PokemonInfo } from '@/lib/api/type';
import { INITIAL_INFINITE_DATA } from '@/lib/constant';
import { InfiniteData, useQuery } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';

function useSearchPokemon() {
  //검색된 데이터 관리
  const [searchValue, setSearchValue] = useState('');
  const [searchedPokemon, setSearchedPokemon] = useState<InfiniteData<PokemonInfo[]> | false | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleResetSearchedPokemon = () => {
    setSearchedPokemon(null);
  };

  const handleSearchValue = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('pokemonName') as string;
    setSearchValue(name);
    if (inputRef.current) inputRef.current.value = '';
  };
  const { data: searchedPokemonData } = useQuery({
    queryKey: ['pokemon', searchValue],
    queryFn: async () => {
      const response = await getPokemonInfo({ number: searchValue, language: 'ko' });
      if (!response) {
        return setSearchedPokemon(false);
      } else {
        const nextData = {
          pages: [[response]],
          pageParams: [],
        };
        //무한스크롤 쿼리들과 형식을 맞추기 위해서
        setSearchedPokemon(nextData);
        return nextData;
      }
    },
    enabled: !!searchValue,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  return { searchValue, searchedPokemon, handleSearchValue, inputRef, handleResetSearchedPokemon };
}
export default useSearchPokemon;
