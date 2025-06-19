import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { fetchBoardById } from '../../store/boardSlice';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';
import "./header.css";


const SearchBar = () => {
  const [query, setQuery] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const handleSearch = () => {
    if (!query.trim()) return;
    dispatch(fetchBoardById(query));
  };

  return (
    <div className='search-bar'>
      <SearchInput value={query} onChange={setQuery} />
      <SearchButton onClick={handleSearch} />
    </div>
  );
};

export default SearchBar;
