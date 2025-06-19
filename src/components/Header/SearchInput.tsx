import './header.css'; 

type Props = {
    value: string;
    onChange: (v: string) => void;
}

const SearchInput = ({value, onChange}: Props) => {
    return (
        <div className="search-input">
            <input
                placeholder="Enter board id..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default SearchInput;