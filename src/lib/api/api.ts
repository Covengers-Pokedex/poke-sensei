import { fetchPokemonData, fetchSpeciesData, fetchEvolutionData, fetchPokemonListData, fetchTypeData } from './fetch';
import { GetPokemonParams, PokemonInfo, Language, GetPokemonListParams, GetPokemonTypeListParams } from './type';
import axiosInstance from './instance';
import {
  getPokemonName,
  getPokemonGenus,
  getFlavorText,
  getPokemonTypes,
  getImages,
  getAbilities,
  getTypeList,
  getEvolutionList,
} from './getPokemonData';
import { getRandomNumber } from '@/utils/randomNumber';
import { MAX_4TH_GEN_POKEMON_ID } from '../constant/constant';

// 포켓몬 한마리의 데이터
export const getPokemonInfo = async ({ number, language }: GetPokemonParams) => {
  const pokemonData = await fetchPokemonData(number);
  const { id, weight, height, abilities, types, species } = pokemonData;
  const speciesNumber = species.url.match(/(\d+)(?=\/?$)/)[0]; // 포켓몬 설명 데이터를 가져오는 url에서 쿼리(고유 번호)만 가져오는 정규식
  const speciesData = await fetchSpeciesData(speciesNumber);
  const evolutionNumber = speciesData.evolution_chain.url.match(/(\d+)(?=\/?$)/)[0];
  const evolutionData = await fetchEvolutionData(evolutionNumber);

  const evolution = await getEvolutionList(evolutionData, axiosInstance);
  const name = getPokemonName(speciesData, language);
  const genus = getPokemonGenus(speciesData, language);
  const flavor = getFlavorText(speciesData, language);
  const typeList = await getPokemonTypes(types, axiosInstance, language);
  const { pokemonImage, pokemonShinyImage } = getImages(pokemonData);
  const abilityList = await getAbilities(abilities, axiosInstance, language);

  // 체중과 신장 값을 10으로 나눈다
  const formattedWeight = weight < 10 ? (weight / 10).toFixed(1) : weight / 10;
  const formattedHeight = height < 10 ? (height / 10).toFixed(1) : height / 10;

  return {
    id,
    weight: formattedWeight,
    height: formattedHeight,
    name,
    genus,
    flavor,
    typeList,
    image: pokemonImage,
    shiny: pokemonShinyImage,
    abilityList,
    evolutionList: evolution,
  } as PokemonInfo;
};

// 포켓몬 도감 리스트 데이터
// Todo 더보기 버튼 클릭시 offset와 limit로 추가 데이터 불러오도록 하기
export const getPokemonAllList = async ({ offset = 0, limit = 20 }: GetPokemonListParams) => {
  // 494번 이후 부터는 불러오지 않음
  if (offset > MAX_4TH_GEN_POKEMON_ID) {
    return [];
  }

  // 493번에 맞게 limit 조정
  const requestLimit = Math.min(limit, MAX_4TH_GEN_POKEMON_ID - offset);

  // offset: 몇번째 부터 불러올지 정하는 값, limit: 몇개의 데이터를 불러올지 정하는 값
  const pokemonAllListResponse = await fetchPokemonListData({ offset, limit: requestLimit });
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

// 포켓몬 타입 필터 포켓몬 리스트(해당 타입 숫자를 넣으면 타입에 관련된 포켓몬 리스트 노출)
export const getPokemonTypeList = async ({ number, limit = 20, offset = 0 }: GetPokemonTypeListParams) => {
  try {
    const typeData = await fetchTypeData(number);
    const pokemonData = await getTypeList(typeData, axiosInstance);
    const pokemonIdAllList = pokemonData.map(pokemon => pokemon.data.id);
    const pokemonIdList = pokemonData
      .slice(offset, offset + limit) // 기본으로 데이터 20개씩 가져오고 offset를 20씩 늘려주면 그 후로 포켓몬 리스트를 20개씩 가져올 수 있다.
      .map((pokemonData: any) => pokemonData.data.id);

    const pokemonList = await Promise.all(
      pokemonIdList.map((pokemonId: any) => {
        return getPokemonInfo({ number: pokemonId, language: 'ko' });
      }),
    );

    return { pokemonList, pokemonIdAllList };
  } catch (error) {
    console.error(error);
  }
};

// 로딩용 랜덤 포켓몬 이미지 생성
export const getLoadingPokemonImage = async () => {
  const randomNumber = getRandomNumber(1, MAX_4TH_GEN_POKEMON_ID);
  return await getLoadingImage(randomNumber);
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
