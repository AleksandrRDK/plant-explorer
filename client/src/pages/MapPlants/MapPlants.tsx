import './MapPlants.sass';
import 'leaflet/dist/leaflet.css';

import { Navigation } from '@/components/Navigation/Navigation';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import ClipLoader from 'react-spinners/ClipLoader';

import type { MapPlantsType } from '@/types/plant';
import type { LatLngExpression } from 'leaflet';

import { useEffect, useState, useRef } from 'react';
import { fetchMapPlants, searchMapPlants } from '@/api/mapPlants';

const COUNTRIES = [
    { name: 'США', id: '1' },
    { name: 'Канада', id: '6712' },
    { name: 'Россия', id: '7183' },
    { name: 'Бразилия', id: '6891' },
    { name: 'Австралия', id: '6744' },
    { name: 'Франция', id: '6451' },
    { name: 'Япония', id: '6759' },
];

const MapPlants = () => {
    const [mapPlants, setMapPlants] = useState<MapPlantsType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState('');
    const [region, setRegion] = useState('');
    const [modalImage, setModalImage] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

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

    const center: LatLngExpression = [48.8566, 2.3522];

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

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRegion(e.target.value);
        inputRef.current?.focus();
    };

    const isValidCoords = (obs: MapPlantsType): boolean => {
        return (
            obs.geojson &&
            Array.isArray(obs.geojson.coordinates) &&
            obs.geojson.coordinates.length >= 2 &&
            typeof obs.geojson.coordinates[0] === 'number' &&
            typeof obs.geojson.coordinates[1] === 'number'
        );
    };

    return (
        <>
            <Navigation />
            <div className="nav__offset"></div>
            <div className="map-plants">
                <form
                    className="map-plants__filters"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch();
                    }}
                >
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
                {error && <div className="map-plants__error">{error}</div>}
                {isLoading && (
                    <div className="loading-overlay">
                        <ClipLoader color="#36d7b7" size={60} />
                    </div>
                )}
                <MapContainer
                    center={center}
                    zoom={3}
                    scrollWheelZoom={true}
                    style={{
                        minHeight: '500px',
                        height: '80vh',
                        width: '100%',
                    }}
                >
                    <TileLayer
                        attribution="&copy; OpenStreetMap contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {!isLoading && mapPlants.length === 0 && (
                        <p className="map-plants__empty">
                            Совпадений не найдено.
                        </p>
                    )}
                    {mapPlants.map((obs) => {
                        if (!isValidCoords(obs)) return null;

                        const pos: LatLngExpression = [
                            obs.geojson.coordinates[1],
                            obs.geojson.coordinates[0],
                        ];

                        return (
                            <Marker key={obs.id} position={pos}>
                                <Popup>
                                    <div className="popup__content">
                                        <strong>
                                            {obs.species_guess || 'Неизвестно'}
                                        </strong>
                                        {obs.taxon?.default_photo?.url && (
                                            <img
                                                src={
                                                    obs.taxon.default_photo.url
                                                }
                                                alt={obs.species_guess}
                                                className="popup__photo"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setModalImage(
                                                        obs.taxon?.default_photo
                                                            ?.medium_url || null
                                                    );
                                                }}
                                            />
                                        )}
                                        {obs.place_guess && (
                                            <span className="popup__descr">
                                                {obs.place_guess}
                                            </span>
                                        )}
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}
                    {modalImage && (
                        <div
                            className="modal"
                            onClick={() => setModalImage(null)}
                        >
                            <img
                                src={modalImage}
                                alt="Увеличенное фото"
                                className="modal__img"
                            />
                        </div>
                    )}
                </MapContainer>
            </div>
        </>
    );
};

export default MapPlants;
