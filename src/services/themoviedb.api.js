import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const params = {
  params: {
    api_key: import.meta.env.VITE_API_KEY,
    api_bearer: import.meta.env.VITE_API_BEARER,
    language: 'en-US',
    accept: 'application/json',
  },
};

//список найпопулярніших фільмів на сьогодні для створення колекції на головній сторінці.
export const getTrendMovies = async () => {
  const response = await axios.get(`trending/movie/day`, params);
  return response.data;
};

export const getMovieByName = async movieName => {
  const response = await axios.get(`/search/movie?query=${movieName}`, params);
  return response.data;
};
