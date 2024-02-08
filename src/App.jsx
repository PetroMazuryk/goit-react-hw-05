import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { Layout } from './components/Layout/Layout';
import { MoviesPage } from './pages/MoviesPage/MoviesPage';
import { MovieDetailsPage } from './pages/MovieDetailsPage/MovieDetailsPage';
import MovieCast from './components/MovieCast/MovieCast';
import { MovieReviews } from './components/MovieReviews/MovieReviews';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
