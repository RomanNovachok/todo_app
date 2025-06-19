import './header.css'; 

type Props = {
    onClick: () => void;
}

const SearchButton = ({onClick}: Props) => {
    return (
        <div>
            <button onClick={onClick}>Search</button>
        </div>
    );
}; 

export default SearchButton;