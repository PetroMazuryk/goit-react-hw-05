import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { getMovieDetailsById } from '../../services/themoviedb.api';
import imgDefault from '../../imgDefault.jpg';
import css from './MovieDetailsPage.module.css';

export const MovieDetailsPage = () => {
  const [movieInfo, setMovieInfo] = useState({});
  const { movieId } = useParams();

  useEffect(() => {
    try {
      getMovieDetailsById(movieId).then(response => {
        setMovieInfo(response);
      });
    } catch (error) {
      console.log(error);
    }
  }, [movieId]);

  const { poster_path, title, release_date, vote_average, overview, genres } =
    movieInfo;

  return (
    <>
      {!isEmpty(movieInfo) && (
        <div className={css.infoWrapper}>
          <div className={css.textWrapper}>
            <h1 className={css.title}>
              {title}
              {release_date && (
                <span
                  style={{
                    padding: '0px 10px',
                    color: 'rgb(162, 57, 59)',
                  }}
                >
                  ({release_date.slice(0, 4)})
                </span>
              )}
            </h1>

            <p className={css.text}>
              User score: {Math.round(vote_average * 10) + '%'}
            </p>

            <p className={css.text}>
              <b>Overview: </b> {overview}
            </p>

            <p className={css.text}>
              <b>Genres: </b>{' '}
              {genres.length > 0
                ? genres.map(genre => genre.name).join('; ')
                : 'There is no information about genres.'}
            </p>
          </div>
          <img
            src={
              !poster_path
                ? imgDefault
                : `https://image.tmdb.org/t/p/w500/${poster_path}`
            }
            alt={title}
            width="360"
          />
        </div>
      )}
    </>
  );
};
