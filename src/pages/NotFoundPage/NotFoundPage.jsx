import { useRef } from 'react';
import { BackLink } from '../../components/BackLink/BackLink';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  const goBackHref = useRef(location.state?.from || '/');

  return (
    <div>
      <h1 className={css.text}>
        {' '}
        Woops! Sorry, but this page does not exist. Go to the main page!{' '}
      </h1>

      <BackLink href={goBackHref.current}>Go back</BackLink>
    </div>
  );
}
