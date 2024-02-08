import { useEffect, useState } from 'react';
import { getTrendMovies } from '../../services/themoviedb.api';
import { MoviesList } from '../../components/MoviesList/MoviesList';
import { TitlePage } from '../../components/TitlePage/TitlePage';

export default function HomePage() {
  const [trendMovies, setTrendmovies] = useState([]);

  useEffect(() => {
    try {
      getTrendMovies().then(response => {
        setTrendmovies([...response.results]);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <TitlePage text="Trending films today" />
      <MoviesList movies={trendMovies} />;
    </>
  );
}
