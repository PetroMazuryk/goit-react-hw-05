import clsx from 'clsx';
import { useState, useEffect, useRef, Suspense } from 'react';
import { NavLink, useParams, useLocation, Outlet } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { getMovieDetailsById } from '../../services/themoviedb.api';
import imgDefault from '../../imgDefault.jpg';
import { ImArrowLeft } from 'react-icons/im';
import { TitlePage } from '../../components/TitlePage/TitlePage';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const [movieInfo, setMovieInfo] = useState({});
  const { movieId } = useParams();
  const location = useLocation();
  const goBackHref = useRef(location.state?.from || '/');

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

  const navLink = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <>
      <NavLink className={css.navLink} to={goBackHref.current}>
        <span className={css.textArrow}>
          <ImArrowLeft />
        </span>
        Go back
      </NavLink>

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
              <b>Overview: </b>

              {overview ? (
                <span>{overview}</span>
              ) : (
                'There is no information about overwiew.'
              )}
            </p>

            <p className={css.text}>
              <b>Genres: </b>{' '}
              {genres.length > 0
                ? genres.map(genre => genre.name).join('; ')
                : 'There is no information about genres.'}
            </p>
          </div>
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
        </div>
      )}
      <div>
        <TitlePage text="Additional information" />
        <ul className={css.list}>
          <li className={css.item}>
            <NavLink className={navLink} to="cast">
              MovieCast
            </NavLink>
          </li>

          <li className={css.item}>
            <NavLink className={navLink} to="reviews">
              MovieReviews
            </NavLink>
          </li>
        </ul>
        <Suspense fallback={<div>LOADING...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}
