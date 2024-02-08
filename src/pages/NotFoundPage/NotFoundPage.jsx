import { Link } from 'react-router-dom';
import { ImArrowLeft } from 'react-icons/im';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div>
      <h1 className={css.text}>
        {' '}
        Woops, sorry, but this page does not exist. Go to the main page!{' '}
      </h1>

      <Link className={css.navLink} to="/">
        <span className={css.textArrow}>
          <ImArrowLeft />
        </span>
        Go back
      </Link>
    </div>
  );
}
