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
