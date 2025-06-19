import SearchBar from './SearchBar';
import CreateBoardButton from './CreateBoardButton';
import DeleteBoardButton from './DeleteBoardButton';
import "./header.css";

const Header = () => {
  return (
    <header className="header-container">
      <SearchBar />
      <CreateBoardButton />
      <DeleteBoardButton />
    </header>
  );
};

export default Header;
