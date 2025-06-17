type Props = {
    value: string;
    onChange: (v: string) => void;
}

const SearchInput = ({value, onChange}: Props) => {
    return (
        <div>
            <input
                placeholder="Enter board id..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default SearchInput;