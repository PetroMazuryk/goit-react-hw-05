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

// Пошук фільму за ключовим словом на сторінці фільмів.
export const getMovieByName = async movieName => {
  const response = await axios.get(`/search/movie?query=${movieName}`, params);
  return response.data;
};

//запит повної інформації про фільм для сторінки кінофільму.
//'https://api.themoviedb.org/3/movie/movie_id?language=en-US' \
export const getMovieDetailsById = async movieId => {
  const response = await axios.get(`movie/${movieId}`, params);
  return response.data;
};

// запит інформації про акторський склад для сторінки кінофільму.
//api.themoviedb.org/3/movie/movie_id/credits?language=en-US'
export const getMovieCreditsById = async movieId => {
  const response = await axios.get(`movie/${movieId}/credits`, params);
  return response.data;
};

//запит оглядів для сторінки кінофільму.
// https://api.themoviedb.org/3/movie/movie_id/reviews?language=en-US&page=1'
export const getMovieReviewsById = async movieId => {
  const response = await axios.get(`movie/${movieId}/reviews`, params);
  console.log(response);
  return response.data;
};
