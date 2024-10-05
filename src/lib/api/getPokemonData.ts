import { PokemonLanguage, PokemonType, PokemonAbility, PokemonAbilityFlavor } from './type';

// 이름 데이터 추출
export const getPokemonName = (speciesData: any, language: string): string | null => {
  const pokemonName = speciesData.names.find((name: PokemonLanguage) => name.language.name === language);
  return pokemonName ? pokemonName.name : null;
};

// 분류 데이터 추출
export const getPokemonGenus = (speciesData: any, language: string): string | null => {
  const pokemonGenera = speciesData.genera.find((name: PokemonLanguage) => name.language.name === language);
  return pokemonGenera ? pokemonGenera.genus : null;
};

// 설명 데이터 추출
export const getFlavorText = (speciesData: any, language: string): string | null => {
  const flavorText = speciesData.flavor_text_entries.find(
    (flavor: any) =>
      flavor.language.name === language && (flavor.version.name === 'sword' || flavor.version.name === 'omega-ruby'),
  );
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
