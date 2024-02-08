import { useEffect, useState } from 'react';
import { getTrendMovies } from '../../services/themoviedb.api';
import { MoviesList } from '../../components/MoviesList/MoviesList';
import { TitlePage } from '../../components/TitlePage/TitlePage';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';

export default function HomePage() {
  const [trendMovies, setTrendmovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        const fetchMovies = await getTrendMovies({
          abortController: controller,
        });
        setTrendmovies(fetchMovies.results);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError(true);
        }
      }
    }
    fetchData();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      {error && <ErrorMessage />}
      {trendMovies.length > 0 && <TitlePage text="Trending films today" />}
      {trendMovies.length > 0 && <MoviesList movies={trendMovies} />};
    </>
  );
}
