import SearchBar from './SearchBar';
import CreateBoardButton from './CreateBoardButton';
import DeleteBoardButton from './DeleteBoardButton';

const Header = () => {
  return (
    <div>
      <SearchBar />
      <CreateBoardButton />
      <DeleteBoardButton />
    </div>
  );
};

export default Header;
