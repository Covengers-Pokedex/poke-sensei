import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_POKEMON_API,
});

export default axiosInstance;
