import { useEffect, useState } from 'react';

import { getTrendMovies } from '../../services/themoviedb.api';

import imgDefault from '../../imgDefault.jpg';

import css from './HomePage.module.css';

export const HomePage = () => {
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
      <h2 className={css.title}>Trending films today</h2>
      <ul className={css.list}>
        {trendMovies.map(({ poster_path, title, id, vote_average }) => {
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
                />
              </div>
              <div className={css.titleWrapper}>
                <h3 className={css.titleImg}>{title}</h3>
              </div>
              <div className={css.titleVote}>{vote_average.toFixed(1)}</div>
            </li>
          );
        })}
      </ul>
    </>
  );
};
