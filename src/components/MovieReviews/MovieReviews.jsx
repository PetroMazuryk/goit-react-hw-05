import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviewsById } from '../../services/themoviedb.api';
import { TitlePage } from '../../components/TitlePage/TitlePage';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const [movieReviews, setMovieReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    try {
      getMovieReviewsById(movieId).then(response => {
        setMovieReviews(response.results);
      });
    } catch (error) {
      console.log(error);
    }
  }, [movieId]);
  return (
    <>
      {!movieReviews.length ? (
        <TitlePage text="Sorry! We dont have any reviews for this movie" />
      ) : (
        <ul className={css.list}>
          {movieReviews.map(({ id, author, content }) => {
            return (
              <li className={css.item} key={id}>
                <b className={css.author}>{author}</b>
                <p className={css.content}>{content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
