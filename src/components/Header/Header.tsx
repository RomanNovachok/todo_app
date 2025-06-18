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
  onCreateBoard: (board: Board) => void;
};

const Header = ({ onSearchResult, onCreateBoard }: Props) => {
  return (
    <div>
      <SearchBar onSearchResult={onSearchResult} />
      <CreateBoardButton onCreate={onCreateBoard} />
    </div>
  );
};

export default Header;
