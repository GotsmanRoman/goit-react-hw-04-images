import { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.module';

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    const { value } = event.currentTarget;
    setQuery(value);
  };
  const handleSubmit = event => {
    event.preventDefault();

    onSubmit(query);
    resetForm();
  };
  const resetForm = () => {
    setQuery('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel></SearchFormButtonLabel>
          <AiOutlineSearch />
        </SearchFormButton>

        <SearchFormInput
          name="query"
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </SearchForm>
    </Header>
  );
}
export { Searchbar };

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
