import { getLoadingPokemonImage } from '@/lib/api/api';
import { useQuery } from '@tanstack/react-query';
import RandomPokemon from './RandomPokemon';
import { useMemo } from 'react';

export default function RandomPokemonLoading() {
  const { data: pokemonImgSrc } = useQuery({
    queryKey: ['loading'],
    queryFn: getLoadingPokemonImage,
  });

  // 상위 컴포넌트에서 중복된 useEffect를 사용할 경우, isFetching 도중에 이미지가 바뀌어 버리는 현상이 발생하여,
  // 마운트 시에만 새로운 데이터를 불러오고, 리렌더링 시에는 기존 데이터를 유지하도록 하기 위한 메모이제이션
  // staleTime으로 조정하면 해당 시간에 겹칠 경우, 중간에 이미지가 바뀌어버리는 현상이 발생함
  const memoSrc = useMemo(() => pokemonImgSrc, []);

  return <RandomPokemon pokemonImgSrc={memoSrc} />;
}
