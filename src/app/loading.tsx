import { getLoadingPokemonImage } from '@/lib/api/api';
import RandomPokemon from './_components/loading/RandomPokemon';

// SSR 과정의 로딩중에 표출되는 로딩 컴포넌트
export default async function Loading() {
  const pokemonImgSrc = await getLoadingPokemonImage();

  return <RandomPokemon pokemonImgSrc={pokemonImgSrc} />;
}
