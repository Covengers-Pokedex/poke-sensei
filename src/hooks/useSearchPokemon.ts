import { POKEMON_QUERY_KEY } from '@/constants/queryKeys';
import { getPokemonInfo } from '@/lib/api/api';
import { PokemonInfo } from '@/lib/api/type';
import pokemonNamesKoEn from '@/db/pokemonNamesKoEn.json';
import { InfiniteData, useQuery } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { FilteredPokemonArr } from '@/types/filteredPokemon';
import { disassemble } from 'es-hangul';
import { NOT_FOUND_POKEMON } from '@/constants/searchNotFound';
import { useLanguageStore } from '@/stores/useLanguageStore';

function useSearchPokemon() {
  //검색된 데이터 관리
  const [searchValue, setSearchValue] = useState('');
  const [queryValue, setQueryValue] = useState('');
  const [searchedPokemon, setSearchedPokemon] = useState<InfiniteData<PokemonInfo[]> | false | null>(null);
  const [filteredPokemon, setFilteredPokemon] = useState<FilteredPokemonArr[]>([]);
  const handleResetSearchedPokemon = () => {
    setSearchedPokemon(null);
  };
  const { language } = useLanguageStore();

  const mappedData = useMemo(() => {
    const parsedData: Record<string, string> = pokemonNamesKoEn;
    const processedData = Object.keys(parsedData).map(key => ({
      ko: key,
      en: parsedData[key],
      disassembled: disassemble(key),
    }));
    return processedData;
  }, []);

  const filterPokemon = (value: string) => {
    const compareData = language === 'ko' ? 'disassembled' : 'en';
    const compareValue = language === 'ko' ? disassemble(value) : value;
    const filteredData = mappedData.filter(data =>
      data[compareData].toLowerCase().includes(compareValue.toLowerCase()),
    );
    setFilteredPokemon(filteredData);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    setSearchValue(targetValue);
    if (!targetValue) {
      setFilteredPokemon([]);
      return;
    }
    filterPokemon(targetValue);
  };

  const handleClickFilteredPokemon = (value: FilteredPokemonArr) => {
    if (value.en === NOT_FOUND_POKEMON[0].en) {
      return;
    }
    const rowerCasePokemon = value.en.toLowerCase();
    setQueryValue(rowerCasePokemon);
    setSearchValue('');
    setFilteredPokemon([]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //자동완성된 포켓몬이 없으면 어차피 해당 포켓몬이 없다고 판단, 있을 때만 검색됨
    if (filteredPokemon.length <= 0 || filteredPokemon[0].en === NOT_FOUND_POKEMON[0].en) {
      setSearchValue('');
      return;
    }
    const rowerCasePokemon = filteredPokemon[0].en.toLowerCase();
    setSearchValue(filteredPokemon[0][language]);
    setQueryValue(rowerCasePokemon);
    setSearchValue('');
    setFilteredPokemon([]);
  };

  useQuery({
    queryKey: [POKEMON_QUERY_KEY, queryValue],
    queryFn: async () => {
      const response = await getPokemonInfo({ number: queryValue, language });
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
    enabled: !!queryValue,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  return {
    searchValue,
    queryValue,
    searchedPokemon,
    handleSubmit,
    handleInputChange,
    handleResetSearchedPokemon,
    handleClickFilteredPokemon,
    filteredPokemon,
  };
}
export default useSearchPokemon;
