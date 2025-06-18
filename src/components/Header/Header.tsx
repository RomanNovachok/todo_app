import SearchBar from './SearchBar';
import CreateBoardButton from './CreateBoardButton';
import DeleteBoardButton from './DeleteBoardButton';

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
  board: Board | null;
  onSearchResult: (board: Board | null, reason?: string) => void;
  onCreateBoard: (board: Board) => void;
};

const Header = ({ board, onSearchResult, onCreateBoard }: Props) => {
  return (
    <div>
      <SearchBar onSearchResult={onSearchResult} />
      <CreateBoardButton onCreate={onCreateBoard} />
      {board && <DeleteBoardButton boardId={board.id} onBoardDeleted={onSearchResult} />}
    </div>
  );
};

export default Header;
