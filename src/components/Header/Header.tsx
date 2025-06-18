import SearchBar from './SearchBar';
import CreateBoardButton from './CreateBoardButton';

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
      <SearchBar onSearchResult={onSearchResult} />
      <CreateBoardButton/>
    </div>
  );
};

export default Header;
