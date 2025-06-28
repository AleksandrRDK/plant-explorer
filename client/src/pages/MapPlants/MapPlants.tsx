import './MapPlants.sass';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import type { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

type Observation = {
    id: number;
    species_guess: string;
    geojson: { coordinates: [number, number] };
};

const MapPlants = () => {
    const [observations, setObservations] = useState<Observation[]>([]);

    useEffect(() => {
        fetch(
            'https://api.inaturalist.org/v1/observations?taxon_id=47126&per_page=50&order=desc&order_by=created_at'
        )
            .then((res) => res.json())
            .then((data) => setObservations(data.results))
            .catch((err) => console.error('Ошибка загрузки данных:', err));
    }, []);

    const center: LatLngExpression = [48.8566, 2.3522];

    return (
        <div className="map-plants">
            <MapContainer
                center={center}
                zoom={3}
                scrollWheelZoom={true}
                style={{ height: '500px', width: '100%' }}
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {observations.map((obs) => {
                    const pos: LatLngExpression = [
                        obs.geojson.coordinates[1],
                        obs.geojson.coordinates[0],
                    ];
                    return (
                        <Marker key={obs.id} position={pos}>
                            <Popup>{obs.species_guess || 'Неизвестно'}</Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
};

export default MapPlants;
