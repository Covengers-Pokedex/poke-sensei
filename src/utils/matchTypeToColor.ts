import { PokemonTypeWithColor } from '@/lib/api/type';

const matchTypeToColor = (type: keyof typeof PokemonTypeWithColor): string => {
  return PokemonTypeWithColor[type];
};

export default matchTypeToColor;
