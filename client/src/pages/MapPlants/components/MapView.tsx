import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import type { MapPlantsType } from '@/types/plant';

type Props = {
    plants: MapPlantsType[];
    setModalImage: (url: string | null) => void;
    isLoading: boolean;
};

export const MapView = ({ plants, setModalImage, isLoading }: Props) => {
    const center: LatLngExpression = [48.8566, 2.3522];

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
        <MapContainer
            center={center}
            zoom={3}
            scrollWheelZoom={true}
            style={{
                height: '80vh',
                width: '100%',
            }}
        >
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {!isLoading && plants.length === 0 && (
                <p className="map-plants__empty">Совпадений не найдено.</p>
            )}
            {plants.map((obs) => {
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
                                        src={obs.taxon.default_photo.url}
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
        </MapContainer>
    );
};
