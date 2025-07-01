import './SearchBar.sass';

type SearchBarProps = {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    onSearch: () => void;
    isLoading: boolean;
};

const SearchBar = ({
    query,
    setQuery,
    onSearch,
    isLoading,
}: SearchBarProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch();
    };
    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <span className="search-bar__label">Поиск:</span>
            <input
                className="search-bar__input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Введите название растения..."
                aria-label="Поиск растения"
            />
            <button className="search-bar__button" disabled={isLoading}>
                {isLoading ? 'Поиск...' : 'Найти'}
            </button>
        </form>
    );
};

export default SearchBar;
