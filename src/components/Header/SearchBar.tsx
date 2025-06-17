import { useState } from 'react';
import axios from 'axios';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';

type Task = {
  title: string;
  description: string;
};

type Board = {
  id: string;
  name: string;
  columns: Record<string, Task[]>;
};

type Props = {
  onSearchResult: (board: Board | null) => void;
};

const SearchBar = ({ onSearchResult }: Props) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get<Board>(`/api/boards/search?query=${encodeURIComponent(query)}`);
      onSearchResult(response.data);
    } catch (error) {
      console.error('Error searching board:', error);
      onSearchResult(null);
    }
  };

  return (
    <div>
      <SearchInput value={query} onChange={setQuery} />
      <SearchButton onClick={handleSearch} />
    </div>
  );
};

export default SearchBar;
