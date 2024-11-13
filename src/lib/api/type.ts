export enum PokemonTypeWithColor {
  노말 = '#A8A77A',
  불꽃 = '#EE8130',
  물 = '#6390F0',
  전기 = '#F7D02C',
  풀 = '#7AC74C',
  얼음 = '#96D9D6',
  격투 = '#C22E28',
  독 = '#A33EA1',
  땅 = '#E2BF65',
  비행 = '#A98FF3',
  에스퍼 = '#F95587',
  벌레 = '#A6B91A',
  바위 = '#B6A136',
  고스트 = '#735797',
  드래곤 = '#6F35FC',
  악 = '#705746',
  강철 = '#B7B7CE',
  페어리 = '#D685AD',
}

export interface Language {
  name: string;
  url: string;
}

export interface PokemonLanguage {
  name: keyof typeof PokemonTypeWithColor;
  language: Language;
}

export interface PokemonAbilityFlavor {
  flavor_text: string;
  language: Language;
  version_group: Language;
}

export interface PokemonFlavor {
  flavor_text: string;
  language: Language;
  version: Language;
}

export interface PokemonType {
  slot: number;
  type: Language;
}

export interface PokemonAbility {
  slot: number;
  is_hidden: boolean;
  ability: Language;
}

export interface GetPokemonParams {
  number: number | string;
  language: string;
}

export interface GetPokemonListParams {
  offset?: number | undefined;
  limit?: number | undefined;
}

export interface GetPokemonTypeListParams extends GetPokemonListParams {
  number: number;
}

export interface Ability {
  flavor: string;
  name: string;
}

export interface PokemonInfo {
  id: number;
  weight: number;
  height: number;
  image: string;
  name: string;
  genus: string;
  flavor: string;
  shiny: string;
  abilityList: Ability[];
  typeList: PokemonLanguage[];
  evolutionList: any;
}
