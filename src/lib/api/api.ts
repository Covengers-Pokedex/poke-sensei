import { fetchPokemonData, fetchSpeciesData, fetchEvolutionData } from './fetch';
import { GetPokemonParams, PokemonInfo } from './type';
import axiosInstance from './instance';
import {
  getPokemonName,
  getPokemonGenus,
  getFlavorText,
  getPokemonTypes,
  getImages,
  getAbilities,
} from './getPokemonData';

// 포켓몬 한마리의 데이터
export const getPokemonInfo = async ({ number, language }: GetPokemonParams) => {
  try {
    const pokemonData = await fetchPokemonData(number);
    const speciesData = await fetchSpeciesData(number);

    const { id, weight, height, abilities, types } = pokemonData;

    const name = getPokemonName(speciesData, language);
    const genus = getPokemonGenus(speciesData, language);
    const flavor = getFlavorText(speciesData, language);
    const typeList = await getPokemonTypes(types, axiosInstance, language);
    const { pokemonImage, pokemonShinyImage } = getImages(pokemonData);
    const abilityList = await getAbilities(abilities, axiosInstance, language);

    return {
      id,
      weight,
      height,
      name,
      genus,
      flavor,
      typeList,
      image: pokemonImage,
      shiny: pokemonShinyImage,
      abilityList,
    } as PokemonInfo;
  } catch (error) {
    console.error(error);
  }
};

let defaultNumber: number | null = null; // 두번 호출되어 서로 다른 데이터를 호출하는 현상 방지 코드
// 포켓몬 랜덤 이미지(로딩, 퀴즈)
export const getPokemonRandomImage = async () => {
  if (defaultNumber === null) {
    defaultNumber = Math.floor(Math.random() * 1025 + 1);
  }

  const pokemonData = await fetchPokemonData(defaultNumber);
  const pokemonRandomImage =
    pokemonData.sprites.versions['generation-v']['black-white'].animated.front_default ||
    pokemonData.sprites.front_default;
  return pokemonRandomImage;
};
