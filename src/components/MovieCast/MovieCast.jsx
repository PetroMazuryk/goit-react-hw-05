import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCreditsById } from '../../services/themoviedb.api';
import { TitlePage } from '../TitlePage/TitlePage';
import imgDefault from '../../imgDefault.jpg';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const [movieCast, setMovieCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    try {
      getMovieCreditsById(movieId).then(response => {
        setMovieCast(response.cast);
      });
    } catch (error) {
      console.log(error);
    }
  }, [movieId]);

  return (
    <>
      {!movieCast.length ? (
        <TitlePage text="Sorry! We do not have information about this movie." />
      ) : (
        <ul className={css.list}>
          {movieCast.map(({ id, profile_path, name, character }) => {
            return (
              <li className={css.item} key={id}>
                <img
                  className={css.img}
                  src={
                    !profile_path
                      ? imgDefault
                      : `https://image.tmdb.org/t/p/w500/${profile_path}`
                  }
                  alt={`${name}`}
                  width="140px"
                />
                <p className={css.text}>{name}</p>
                <p className={css.text}>{character}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
