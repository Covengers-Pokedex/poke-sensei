import { PokemonLanguage, PokemonType, PokemonAbility, PokemonAbilityFlavor } from './type';

// 이름 데이터 추출
export const getPokemonName = (speciesData: any, language: string): string | null => {
  const pokemonName = speciesData.names.find((name: PokemonLanguage) => name.language.name === language);
  return pokemonName ? pokemonName.name : null;
};

// 타입에 따른 포켓몬 리스트 추출
export const getTypeList = async (typeData: any, axiosInstance: any) => {
  const pokemonTypeList = await Promise.all(
    typeData.map((type: any) => axiosInstance.get(`pokemon/${type.pokemon.name}`)),
  );
  return pokemonTypeList || null;
};

// 분류 데이터 추출
export const getPokemonGenus = (speciesData: any, language: string): string | null => {
  const pokemonGenera = speciesData.genera.find((name: PokemonLanguage) => name.language.name === language);
  return pokemonGenera ? pokemonGenera.genus : null;
};

// 설명 데이터 추출
export const getFlavorText = (speciesData: any, language: string): string | null => {
  const flavorText = speciesData.flavor_text_entries.find((flavor: any) => flavor.language.name === language);
  return flavorText ? flavorText.flavor_text.replace(/\n/g, ' ') : null;
};

// 타입 데이터 추출
export const getPokemonTypes = async (types: PokemonType[], axiosInstance: any, language: string) => {
  const typeResponseList = await Promise.all(types.map((type: PokemonType) => axiosInstance.get(type.type.url)));
  return typeResponseList.map(typeResponse => {
    const typeNameList = typeResponse.data.names;
    return typeNameList.find((typeName: PokemonLanguage) => typeName.language.name === language);
  });
};

// 이미지 데이터 추출
export const getImages = (pokemonData: any) => {
  const pokemonImage =
    pokemonData.sprites.versions['generation-v']['black-white'].animated.front_default ||
    pokemonData.sprites.front_default;
  const pokemonShinyImage =
    pokemonData.sprites.versions['generation-v']['black-white'].animated.front_shiny || pokemonData.sprites.front_shiny;

  return { pokemonImage, pokemonShinyImage };
};

// 특성 데이터 추출
export const getAbilities = async (abilities: PokemonAbility[], axiosInstance: any, language: string) => {
  const abilityResponseList = await Promise.all(
    abilities.map((ability: PokemonAbility) => axiosInstance.get(ability.ability.url)),
  );

  return abilityResponseList.map(abilityResponse => {
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
};

// 진화 단계 데이터 추출
export const getEvolutionList = async (evolutionData: any, axiosInstance: any) => {
  if (!evolutionData.chain.evolves_to?.length) {
    console.log('No further evolutions.');
    return null;
  }

  const evolutionList = [];

  const nameData = await axiosInstance.get(evolutionData.chain?.species.url);
  const imageData = await axiosInstance.get(`pokemon/${evolutionData.chain?.species.name}`);
  const { pokemonImage } = getImages(imageData.data);
  const pokemonName = getPokemonName(nameData.data, 'ko');
  evolutionList.push({ pokemonImage, pokemonName });

  if (evolutionData.chain.evolves_to.length > 0) {
    const nameData = await axiosInstance.get(evolutionData.chain.evolves_to[0]?.species.url);
    const imageData = await axiosInstance.get(`pokemon/${evolutionData.chain.evolves_to[0]?.species.name}`);
    const { pokemonImage } = getImages(imageData.data);
    const pokemonName = getPokemonName(nameData.data, 'ko');
    evolutionList.push({ pokemonImage, pokemonName });
  }

  if (evolutionData.chain.evolves_to[0].evolves_to.length > 0) {
    const nameData = await axiosInstance.get(evolutionData.chain.evolves_to[0].evolves_to[0]?.species.url);
    const imageData = await axiosInstance.get(
      `pokemon/${evolutionData.chain.evolves_to[0].evolves_to[0]?.species.name}`,
    );
    const { pokemonImage } = getImages(imageData.data);
    const pokemonName = getPokemonName(nameData.data, 'ko');
    evolutionList.push({ pokemonImage, pokemonName });
  }

  return evolutionList;
};
