import css from './TitlePage.module.css';

export const TitlePage = ({ text }) => {
  return <h2 className={css.title}>{text}</h2>;
};
