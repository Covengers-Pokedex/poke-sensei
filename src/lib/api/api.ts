import axiosInstance from './instance';
import {
  PokemonLanguage,
  PokemonType,
  PokemonFlavor,
  PokemonAbility,
  PokemonAbilityFlavor,
  GetPokemonParams,
} from './type';
import { END_POINT } from './path';

// 전체 데이터
export const fetchPokemonData = async (number?: number) => {
  try {
    const response = await axiosInstance.get(`${END_POINT.pokemon}${number ? number : ''}`);
    console.log(response.data.results);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 포켓몬 정보(번호, 체중, 신장, 이름, 분류, 설명, 타입, 이미지, 특성)
export const getPokemonInfo = async ({ number, language, shiny }: GetPokemonParams) => {
  try {
    const pokemonData = await fetchPokemonData(number);
    const { id, weight, height, abilities, types } = pokemonData;

    // 이름 데이터
    const speciesResponse = await axiosInstance.get(`${END_POINT.species}${number}`);
    const pokemonNameList = speciesResponse.data.names;
    const pokemonName = pokemonNameList.find((name: PokemonLanguage) => name.language.name === language);

    // 분류 데이터
    const pokemonGeneraList = speciesResponse.data.genera;
    const pokemonGenera = pokemonGeneraList.find((name: PokemonLanguage) => name.language.name === language);

    // 설명 데이터
    const pokemonFlavorList = speciesResponse.data.flavor_text_entries;
    const flavorText = pokemonFlavorList.find(
      (flavor: PokemonFlavor) => flavor.language.name === language && flavor.version.name === 'sword',
    );
    const pokemonFlavor = flavorText ? flavorText.flavor_text.replace(/\n/g, ' ') : null;

    // Todo 진화 단계
    const evolutionResponse = await axiosInstance.get(`${END_POINT.evolution}${number}`);
    const evolutionList = evolutionResponse.data.chain.evolves_to;

    // 타입 데이터
    const typeUrlList = types.map((type: PokemonType) => type.type.url);
    const typeResponseList = await Promise.all(typeUrlList.map((typeUrl: string) => axiosInstance.get(typeUrl)));
    const pokemonTypeList = typeResponseList.map(typeResponse => {
      const typeNameList = typeResponse.data.names;
      return typeNameList.find((typeName: PokemonLanguage) => typeName.language.name === language);
    });

    // 이미지 데이터
    const pokemonImage = shiny
      ? pokemonData.sprites.versions['generation-v']['black-white'].animated.front_shiny ||
        pokemonData.sprites.front_shiny
      : pokemonData.sprites.versions['generation-v']['black-white'].animated.front_default ||
        pokemonData.sprites.front_default;

    // 특성 데이터
    const abilityUrlList = abilities.map((ability: PokemonAbility) => ability.ability.url);

    const abilityResponseList = await Promise.all(
      abilityUrlList.map((abilityUrl: string) => axiosInstance.get(abilityUrl)),
    );

    const pokemonAbilityList = abilityResponseList.map(abilityResponse => {
      const { flavor_text_entries, names } = abilityResponse.data;
      const abilityName = names.find((abilityName: PokemonLanguage) => abilityName.language.name === language);
      const abilityFlavor = flavor_text_entries.find(
        (abilityFlavor: PokemonAbilityFlavor) =>
          abilityFlavor.language.name === language && abilityFlavor.version_group.name === 'sword-shield',
      );
      return {
        name: abilityName ? abilityName.name.replace(/\n/g, ' ') : null,
        flavor: abilityFlavor ? abilityFlavor.flavor_text.replace(/\n/g, ' ') : null,
      };
    });

    return {
      id, // 번호
      weight, // 체중
      height, // 신장
      name: pokemonName ? pokemonName.name : null, // 이름
      genus: pokemonGenera ? pokemonGenera.genus : null, // 분류
      flavor: pokemonFlavor, // 설명
      evolution: evolutionList, // Todo 진화단계
      typeList: pokemonTypeList, // 타입
      image: pokemonImage, // 이미지
      abilityList: pokemonAbilityList, // 특성
    };
  } catch (error) {
    console.error(error);
  }
};
