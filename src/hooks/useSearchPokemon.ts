import { POKEMON_QUERY_KEY } from '@/constants/queryKeys';
import { getPokemonInfo } from '@/lib/api/api';
import pokemonNamesKoEn from '@/db/pokemonNamesKoEn.json';
import { useQuery } from '@tanstack/react-query';
import { FormEvent, useMemo, useState } from 'react';
import { FilteredPokemonArr } from '@/types/filteredPokemon';
import { disassemble } from 'es-hangul';
import { NOT_FOUND_POKEMON } from '@/constants/searchNotFound';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { useToastAction } from '@/stores/actions/useToastAction';

function useSearchPokemon() {
  //검색된 데이터 관리
  const [searchValue, setSearchValue] = useState('');
  const [queryValue, setQueryValue] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState<FilteredPokemonArr[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToast } = useToastAction();
  const { language } = useLanguageStore();
  const changeModalOpenValue = (bool: boolean) => {
    setIsModalOpen(bool);
  };
  const handleResetSearchedPokemon = () => {
    setQueryValue('');
  };

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

  const handleInputChange = (value: string) => {
    setSearchValue(value);
    if (!value) {
      setFilteredPokemon([]);
      return;
    }
    filterPokemon(value);
  };

  const handleClickFilteredPokemon = (value: FilteredPokemonArr) => {
    if (value.en === NOT_FOUND_POKEMON[0].en) {
      addToast({ type: 'error', message: '검색된 포켓몬이 없어요!' });
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
      addToast({ type: 'error', message: '검색된 포켓몬이 없어요!' });
      setSearchValue('');
      return;
    }
    const rowerCasePokemon = filteredPokemon[0].en.toLowerCase();
    setSearchValue(filteredPokemon[0][language]);
    setQueryValue(rowerCasePokemon);
    setSearchValue('');
    setFilteredPokemon([]);
  };

  const { data, isFetching } = useQuery({
    queryKey: [POKEMON_QUERY_KEY, queryValue],
    queryFn: async () => {
      const response = await getPokemonInfo({ number: queryValue, language });
      if (!response) {
        return;
      } else {
        const nextData = {
          pages: [[response]],
          pageParams: [],
        };
        //무한스크롤 쿼리들과 형식을 맞추기 위해서

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
    data,
    handleSubmit,
    handleInputChange,
    handleResetSearchedPokemon,
    handleClickFilteredPokemon,
    filteredPokemon,
    isFetching,
    isModalOpen,
    changeModalOpenValue,
  };
}
export default useSearchPokemon;
