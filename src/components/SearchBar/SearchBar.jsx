import toast from 'react-hot-toast';
import { useState } from 'react';
import css from './SearchBar.module.css';
import { MdOutlineScreenSearchDesktop } from 'react-icons/md';

export const SearchBar = ({ onSubmit }) => {
  const [inputName, setInputName] = useState('');

  const handleInputChange = event => setInputName(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();

    if (inputName.trim() === '') {
      toast.warn('Search query can`t be empty!!!');
      return;
    }

    onSubmit(inputName);

    setInputName('');
  };

  return (
    <div className={css.wrapper}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button className={css.button} type="submit">
          <MdOutlineScreenSearchDesktop className={css.icon} />
        </button>
        <input
          onChange={handleInputChange}
          className={css.input}
          type="text"
          name="query"
          placeholder="Search images and photos"
        />
      </form>
    </div>
  );
};
