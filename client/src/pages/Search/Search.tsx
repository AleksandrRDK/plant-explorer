import './Search.sass';
import { Navigation } from '../../components/Navigation/Navigation';
import Pagination from './components/Pagination/Pagination';
import PlantGrid from './components/PlantGrid/PlantGrid';
import SearchBar from './components/SearchBar/SearchBar';

import { useState, useEffect } from 'react';
import type { Plant } from '@/types/plant';

import { fetchPlants } from '@/api/searchTrees';

const Search = () => {
    const [query, setQuery] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [plants, setPlants] = useState<Plant[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadPlants = async () => {
            setIsLoading(true);
            const { plants, lastPage } = await fetchPlants(searchTerm, page);
            setPlants(plants);
            setLastPage(lastPage);
            setIsLoading(false);
        };

        loadPlants();
    }, [searchTerm, page]);

    const onSearch = () => {
        setPage(1);
        setSearchTerm(query);
    };

    return (
        <main className="search-page">
            <Navigation />
            <SearchBar
                query={query}
                setQuery={setQuery}
                onSearch={onSearch}
                isLoading={isLoading}
            />
            <PlantGrid plants={plants} isLoading={isLoading} />
            {isLoading ? null : (
                <Pagination
                    page={page}
                    setPage={setPage}
                    hasNextPage={page < lastPage}
                />
            )}
        </main>
    );
};

export default Search;
