import './MapPlants.sass';
import { Navigation } from '@/components/Navigation/Navigation';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import type { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
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

type MapPlants = {
    id: number;
    species_guess: string;
    geojson: { coordinates: [number, number] };
    photos?: { url: string }[];
    place_guess?: string;
    taxon?: {
        default_photo?: {
            url: string;
            medium_url: string;
        };
    };
};

const MapPlants = () => {
    const [mapPlants, setMapPlants] = useState<MapPlants[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [query, setQuery] = useState('');
    const [region, setRegion] = useState('');
    const [modalImage, setModalImage] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        fetchMapPlants()
            .then(setMapPlants)
            .catch((err) => console.error('Ошибка загрузки данных:', err))
            .finally(() => setIsLoading(false));
    }, []);

    const center: LatLngExpression = [48.8566, 2.3522];

    const handleSearch = () => {
        setIsLoading(true);
        searchMapPlants(query, region)
            .then(setMapPlants)
            .catch((err) => console.error('Ошибка загрузки данных:', err))
            .finally(() => setIsLoading(false));
    };

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRegion(e.target.value);
    };

    return (
        <>
            <Navigation />
            <div className="nav__offset"></div>
            <div className="map-plants">
                <div className="map-plants__filters">
                    <input
                        className="map-plants__input"
                        type="text"
                        placeholder="Введите название растения"
                        value={query}
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
                    <button
                        className="map-plants__button"
                        onClick={handleSearch}
                    >
                        Поиск
                    </button>
                </div>
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
                    {mapPlants.map((obs) => {
                        if (
                            !obs.geojson ||
                            !Array.isArray(obs.geojson.coordinates) ||
                            obs.geojson.coordinates.length < 2
                        ) {
                            return null;
                        }

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
