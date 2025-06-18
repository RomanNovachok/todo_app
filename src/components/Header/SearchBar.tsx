import { useState } from 'react';
import axios from 'axios';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';
import { Board } from '../../types/types';

type Props = {
  onSearchResult: (board: Board | null) => void;
};

const SearchBar = ({ onSearchResult }: Props) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get<Board>(`/api/boards/search?query=${encodeURIComponent(query)}`);
      onSearchResult(response.data);
    } catch (error: any) {
      console.error('Error searching board:', error);
      onSearchResult(null); 
    }
  };

  return (
    <div>
      <SearchInput value={query} onChange={setQuery} />
      <SearchButton onClick={handleSearch} />
      {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
    </div>
  );
};

export default SearchBar;
