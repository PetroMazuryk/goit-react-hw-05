import clsx from 'clsx';

import { SearchBar } from '../../components/SearchBar/SearchBar';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMovieByName } from '../../services/themoviedb.api';

import imgDefault from '../../imgDefault.jpg';

import css from './MoviesPage.module.css';

export const MoviesPage = () => {
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
          The search <span className={css.titleQuery}>{query}</span>
          did not give results
        </h2>
      )}

      {searchMovies.length > 0 && (
        <h2 className={css.title}>
          Search results for keyword{' '}
          <span className={css.titleQuery}>{query}</span>!
        </h2>
      )}

      <ul className={css.list}>
        {searchMovies.map(({ id, poster_path, title, vote_average }) => {
          const getClassByVote = vote_average => {
            if (vote_average >= 7.5) {
              return clsx(css.titleVote, css.green);
            } else if (vote_average > 6) {
              return clsx(css.titleVote, css.orange);
            } else {
              return clsx(css.titleVote, css.red);
            }
          };
          return (
            <li className={css.item} key={id}>
              <div className={css.thumb}>
                <img
                  className={css.img}
                  src={
                    !poster_path
                      ? imgDefault
                      : `https://image.tmdb.org/t/p/w500/${poster_path}`
                  }
                  alt={title}
                  width="360"
                  height="530"
                />
              </div>

              <div className={css.titleWrapper}>
                <h3 className={css.titleImg}>{title}</h3>
              </div>
              {!vote_average ? null : (
                <div className={getClassByVote(vote_average)}>
                  {vote_average.toFixed(1)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};
