import SearchBar from './SearchBar';

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

const Header = ({ onSearchResult }: Props) => {
  return (
    <div>
      <h1>Header</h1>
      <SearchBar onSearchResult={onSearchResult} />
    </div>
  );
};

export default Header;
