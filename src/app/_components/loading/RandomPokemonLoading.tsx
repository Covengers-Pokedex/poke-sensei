import { getLoadingPokemonImage } from '@/lib/api/api';
import { useQuery } from '@tanstack/react-query';
import RandomPokemon from './RandomPokemon';

export default function RandomPokemonLoading() {
  const { data: pokemonImgSrc } = useQuery({ queryKey: ['loading'], queryFn: getLoadingPokemonImage });

  return <RandomPokemon pokemonImgSrc={pokemonImgSrc} />;
}
