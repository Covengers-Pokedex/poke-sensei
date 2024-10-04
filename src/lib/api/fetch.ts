import axiosInstance from './instance';
import { END_POINT } from './path';

// 전체 데이터
export const fetchPokemonData = async (number: number) => {
  try {
    const response = await axiosInstance.get(`${END_POINT.pokemon}${number}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSpeciesData = async (number: number) => {
  try {
    const response = await axiosInstance.get(`${END_POINT.species}${number}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchEvolutionData = async (number: number) => {
  try {
    const response = await axiosInstance.get(`${END_POINT.evolution}${number}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
