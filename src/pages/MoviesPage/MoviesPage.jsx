import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMovieByName } from '../../services/themoviedb.api';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { MoviesList } from '../../components/MoviesList/MoviesList';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useSearchParams();

  const query = searchQuery.get('query') ?? '';

  const handleFormSubmit = inputName => {
    setSearchQuery(inputName !== '' ? { query: inputName } : {});
  };

  useEffect(() => {
    if (query) {
      try {
        getMovieByName(query).then(response => {
          setSearchMovies([...response.results]);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [query]);

  return (
    <>
      <SearchBar onSubmit={handleFormSubmit}></SearchBar>

      {searchMovies.length === 0 && query !== '' && (
        <h2 className={css.title}>
          The search <span className={css.titleQuery}>{query} </span>
          did not give results !
        </h2>
      )}

      {searchMovies.length > 0 && (
        <h2 className={css.title}>
          Search results for keyword
          <span className={css.titleQuery}> {query}</span> !
        </h2>
      )}

      <MoviesList movies={searchMovies} />
    </>
  );
}
