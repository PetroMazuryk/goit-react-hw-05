import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import clsx from 'clsx';
import { getTrendMovies } from '../../services/themoviedb.api';

import imgDefault from '../../imgDefault.jpg';

import css from './HomePage.module.css';

export const HomePage = () => {
  const [trendMovies, setTrendmovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    try {
      getTrendMovies().then(response => {
        setTrendmovies([...response.results]);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

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
    <>
      {trendMovies.length > 0 && (
        <>
          <h2 className={css.title}>Trending films today</h2>
          <ul className={css.list}>
            {trendMovies.map(({ poster_path, title, id, vote_average }) => {
              return (
                <li className={css.item} key={id}>
                  <Link to={`movies/${id}`} state={{ from: location }}>
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
                  </Link>
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
      )}
    </>
  );
};
