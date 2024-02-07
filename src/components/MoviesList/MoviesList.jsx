import { useLocation, Link } from 'react-router-dom';
import clsx from 'clsx';
import imgDefault from '../../imgDefault.jpg';
import css from './MoviesList.module.css';

export const MoviesList = ({ movies }) => {
  const location = useLocation();

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
      {movies.length > 0 && (
        <>
          <ul className={css.list}>
            {movies.map(({ poster_path, title, id, vote_average }) => {
              return (
                <li className={css.item} key={id}>
                  <Link to={`/movies/${id}`} state={{ from: location }}>
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
