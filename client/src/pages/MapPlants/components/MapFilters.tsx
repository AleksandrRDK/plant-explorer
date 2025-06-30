import { COUNTRIES } from '@/constants/countries';
import { useRef } from 'react';
import type { FC, FormEvent } from 'react';

type Props = {
    query: string;
    region: string;
    setQuery: (val: string) => void;
    setRegion: (val: string) => void;
    handleSearch: () => void;
};

export const MapFilters: FC<Props> = ({
    query,
    region,
    setQuery,
    setRegion,
    handleSearch,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRegion(e.target.value);
        inputRef.current?.focus();
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleSearch();
    };

    return (
        <form className="map-plants__filters" onSubmit={handleSubmit}>
            <input
                className="map-plants__input"
                type="text"
                placeholder="Введите название растения"
                value={query}
                ref={inputRef}
                onChange={(e) => setQuery(e.target.value)}
            />
            <input
                className="map-plants__input"
                type="text"
                placeholder="ID региона (например, 1 для США)"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
            />
            <select
                className="map-plants__select"
                value={region}
                onChange={handleCountryChange}
            >
                <option value="">Выберите страну</option>
                {COUNTRIES.map((country) => (
                    <option key={country.id} value={country.id}>
                        {country.name}
                    </option>
                ))}
            </select>
            <button className="map-plants__button" type="submit">
                Поиск
            </button>
        </form>
    );
};
