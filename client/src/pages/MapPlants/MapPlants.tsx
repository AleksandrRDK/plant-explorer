import './MapPlants.sass';
import 'leaflet/dist/leaflet.css';

import { MapFilters } from './components/MapFilters';
import { MapView } from './components/MapView';
import { ImageModal } from './components/ImageModal';

import { Navigation } from '@/components/Navigation/Navigation';
import ClipLoader from 'react-spinners/ClipLoader';

import type { MapPlantsType } from '@/types/plant';

import { useEffect, useState } from 'react';
import { fetchMapPlants, searchMapPlants } from '@/api/mapPlants';

const MapPlants = () => {
    const [mapPlants, setMapPlants] = useState<MapPlantsType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState('');
    const [region, setRegion] = useState('');
    const [modalImage, setModalImage] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        fetchMapPlants()
            .then(setMapPlants)
            .catch((err) => {
                console.error('Ошибка загрузки данных:', err);
                setError('Не удалось загрузить данные. Попробуйте позже.');
            })
            .finally(() => setIsLoading(false));
    }, []);

    const handleSearch = () => {
        setIsLoading(true);
        setError(null);
        searchMapPlants(query, region)
            .then(setMapPlants)
            .catch((err) => {
                console.error('Ошибка загрузки данных:', err);
                if (err.message.includes('ERR_NAME_NOT_RESOLVED')) {
                    setError(
                        'Не удается подключиться к серверу. Попробуйте включить VPN или смените браузер.'
                    );
                } else {
                    setError('Ошибка при поиске растений. Попробуйте ещё раз.');
                }
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <>
            <Navigation />
            <div className="nav__offset"></div>
            <div className="map-plants">
                <MapFilters
                    query={query}
                    region={region}
                    setQuery={setQuery}
                    setRegion={setRegion}
                    handleSearch={handleSearch}
                />
                {error && <div className="map-plants__error">{error}</div>}
                {isLoading && (
                    <div className="loading-overlay">
                        <ClipLoader color="#36d7b7" size={60} />
                    </div>
                )}
                <MapView
                    plants={mapPlants}
                    setModalImage={setModalImage}
                    isLoading={isLoading}
                />
                {modalImage && (
                    <ImageModal
                        image={modalImage}
                        onClose={() => setModalImage(null)}
                    />
                )}
            </div>
        </>
    );
};

export default MapPlants;
