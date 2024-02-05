import { NavLink, Outlet } from 'react-router-dom';
import { SiThemoviedatabase } from 'react-icons/si';
import clsx from 'clsx';
import css from './Layout.module.css';

export const Layout = () => {
  const navLink = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <header className={css.header}>
          <div className={css.logoWrapper}>
            <SiThemoviedatabase className={css.icon} />
            <p className={css.logo}>TMDB</p>
          </div>

          <nav className={css.nav}>
            <NavLink className={navLink} to="/" end>
              HomePage
            </NavLink>
            <NavLink className={navLink} to="/movies">
              MoviesPage
            </NavLink>
          </nav>
        </header>
      </div>

      <Outlet />
    </div>
  );
};
