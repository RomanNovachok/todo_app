import SearchBar from './SearchBar';
import CreateBoardButton from './CreateBoardButton';
import DeleteBoardButton from './DeleteBoardButton';
import { Board } from '../../types/types';

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
      <DeleteBoardButton board={board} onBoardDeleted={onSearchResult} /> {/* показуємо завжди */}
    </div>
  );
};

export default Header;
