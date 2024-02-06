import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { Layout } from './components/Layout/Layout';
import { MoviesPage } from './pages/MoviesPage/MoviesPage';
import { MovieDetailsPage } from './pages/MovieDetailsPage/MovieDetailsPage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}></Route>
      </Route>
    </Routes>
  );
};
