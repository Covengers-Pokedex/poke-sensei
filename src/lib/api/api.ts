import { fetchPokemonData, fetchSpeciesData, fetchEvolutionData, fetchPokemonListData } from './fetch';
import { GetPokemonParams, PokemonInfo, Language } from './type';
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

// 포켓몬 도감 리스트 데이터
// Todo 더보기 버튼 클릭시 offset와 limit로 추가 데이터 불러오도록 하기
export const getPokemonAllList = async ({ offset = 0, limit = 20 }) => {
  // offset: 몇번째 부터 불러올지 정하는 값, limit: 몇개의 데이터를 불러올지 정하는 값
  const pokemonAllListResponse = await fetchPokemonListData({ offset, limit });
  const pokemonPromises: PokemonInfo[] = pokemonAllListResponse.results.map((result: Language) => {
    const pokemonQuery = result.name;
    return getPokemonInfo({ number: pokemonQuery, language: 'ko' });
  });
  const pokemonAllList = await Promise.all(pokemonPromises);
  return pokemonAllList as PokemonInfo[];
};

// 포켓몬 로딩 이미지
export const getLoadingImage = async (number: number) => {
  try {
    const pokemonData = await fetchPokemonData(number);
    const { pokemonImage } = getImages(pokemonData);

    return pokemonImage;
  } catch (error) {
    console.error(error);
  }
};

// 랜덤 숫자 생성
export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// 포켓몬 퀴즈 정보(이름, 이미지, 설명)
export const getPokemonRandomImage = async (number: number, language = 'ko') => {
  const [pokemonData, speciesData] = await Promise.all([fetchPokemonData(number), fetchSpeciesData(number)]);
  let pokemonHint = getFlavorText(speciesData, language);
  const pokemonName = getPokemonName(speciesData, language);
  const pokemonRandomImage =
    pokemonData.sprites.versions['generation-v']['black-white'].animated.front_default ||
    pokemonData.sprites.front_default;

  if (!pokemonHint) {
    const pokemonDataRefetch = await fetchSpeciesData(number);
    pokemonHint = getFlavorText(pokemonDataRefetch, language);
  }

  return { pokemonRandomImage, pokemonName, pokemonHint };
};
