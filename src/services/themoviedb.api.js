import axios from 'axios';

const API_KEY = 'ba520957137ad46ba4502dabb5237445';

//список найпопулярніших фільмів на сьогодні для створення колекції на головній сторінці.
export const getTrendMovies = async () => {
  const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/week';
  const response = await axios.get(`${BASE_URL}?api_key=${API_KEY}`);

  return response.data;
};
