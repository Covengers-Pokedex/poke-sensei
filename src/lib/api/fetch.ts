import axiosInstance from './instance';
import { GetPokemonPageParams } from './type';
import { END_POINT } from './path';

export const fetchPokemonListData = async ({ offset, limit }: GetPokemonPageParams) => {
  try {
    const response = await axiosInstance.get(`${END_POINT.pokemon}?offset=${offset}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchPokemonData = async (number: number | string) => {
  try {
    const response = await axiosInstance.get(`${END_POINT.pokemon}${number}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSpeciesData = async (number: number | string) => {
  try {
    const response = await axiosInstance.get(`${END_POINT.species}${number}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchEvolutionData = async (number: number | string) => {
  try {
    const response = await axiosInstance.get(`${END_POINT.evolution}${number}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchTypeData = async (number: number) => {
  try {
    const response = await axiosInstance.get(`${END_POINT.type}${number}`);
    return response.data.pokemon;
  } catch (error) {
    console.error(error);
  }
};
