import { useEffect, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getPokemonInfo } from '@/lib/api/api';
import { PokemonInfo } from '@/lib/api/type';
import ModalTitle from './components/ModalTitle';
import ModalImage from './components/ModalImage';
import ModalTabMenu from './components/ModalTabMenu';
import ModalTabContent from './components/ModalTabContent';

interface PokemonModalProps {
  turnOffToggle: () => void;
  pokemonNumber: number;
}

export default function PokemonModal({ turnOffToggle, pokemonNumber }: PokemonModalProps) {
  const [tabActive, setTabActive] = useState<string>('info');
  const [shiny, setShiny] = useState<boolean>(false);
  const [number, setNumber] = useState<number>(pokemonNumber);

  const { data, isLoading, isError } = useQuery<PokemonInfo>({
    queryKey: ['pokemon', number],
    queryFn: async () => {
      const { id, weight, height, name, genus, flavor, typeList, image, shiny, abilityList, evolutionList } =
        await getPokemonInfo({
          number,
          language: 'ko',
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

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>에러...</div>;
  }
  return (
    <div className="relative w-[360px] sm:w-[500px] md:w-[700px] h-[650px] bg-[#F0F0F0] rounded-2xl p-2 md:p-4">
      <div className="flex flex-col justify-between h-full bg-[#79C9FA] rounded-2xl">
        <ModalTitle pokemonData={data} onTurnOffToggle={turnOffToggle} />
        <ModalImage pokemonData={data} number={number} setNumber={setNumber} shiny={shiny} />
        <div>
          <ModalTabMenu tabActive={tabActive} setTabActive={setTabActive} shiny={shiny} setShiny={setShiny} />
          <ModalTabContent pokemonData={data} tabActive={tabActive} />
        </div>
      </div>
    </div>
  );
}
