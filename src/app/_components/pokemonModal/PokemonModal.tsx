import { useEffect, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getPokemonInfo } from '@/lib/api/api';
import { PokemonInfo } from '@/lib/api/type';
import ModalTitle from './components/ModalTitle';
import ModalImage from './components/ModalImage';
import ModalTabMenu from './components/ModalTabMenu';
import ModalTabContent from './components/ModalTabContent';
import { POKEMON_QUERY_KEY } from '@/constants/queryKeys';
import { useLanguageStore } from '@/stores/useLanguageStore';

interface PokemonModalProps {
  turnOffToggle: () => void;
  pokemonNumber: number;
  carousel?: boolean;
}

export default function PokemonModal({ turnOffToggle, pokemonNumber, carousel }: PokemonModalProps) {
  const { language } = useLanguageStore();
  const [tabActive, setTabActive] = useState<string>('info');
  const [shiny, setShiny] = useState<boolean>(false);
  const [number, setNumber] = useState<number>(pokemonNumber);

  const { data, isError } = useQuery<PokemonInfo>({
    queryKey: [POKEMON_QUERY_KEY, number, language],
    queryFn: async () => {
      const { id, weight, height, name, genus, flavor, typeList, image, shiny, abilityList, evolutionList } =
        await getPokemonInfo({
          number,
          language: language,
        });
      return { id, weight, height, name, genus, flavor, typeList, image, shiny, abilityList, evolutionList };
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData, // 데이터 요청이 성공할 때까지 이전 데이터를 보여준다.
  });

  useEffect(() => {
    setShiny(false);
    setTabActive('info');
  }, []);

  if (isError) {
    return <div>에러...</div>;
  }
  return (
    <div className="relative w-screen max-w-[90%] sm:max-w-[500px] md:max-w-[700px] h-[75vh] max-h-[700px] bg-[#F0F0F0] rounded-2xl mx-auto p-2 md:p-4">
      <div className="flex flex-col justify-between h-full bg-[#79C9FA] rounded-2xl overflow-y-auto">
        <ModalTitle pokemonData={data} onTurnOffToggle={turnOffToggle} language={language} />
        <ModalImage pokemonData={data} number={number} setNumber={setNumber} shiny={shiny} carousel={carousel} />
        <div>
          <ModalTabMenu
            tabActive={tabActive}
            setTabActive={setTabActive}
            shiny={shiny}
            setShiny={setShiny}
            language={language}
          />
          <ModalTabContent pokemonData={data} tabActive={tabActive} language={language} />
        </div>
      </div>
    </div>
  );
}
