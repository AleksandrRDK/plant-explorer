import './PlantGrid.sass';
import PlantCard from './PlantCard/PlantCard';

import type { Plant } from '@/types/plant';

type PlantGridProps = {
    plants: Plant[];
    isLoading: boolean;
};

const PlantGrid = ({ plants, isLoading }: PlantGridProps) => {
    return (
        <div className="plant-grid">
            {isLoading ? (
                <p className="plant-grid__message">Загрузка...</p>
            ) : plants.length > 0 ? (
                <div className="plant-grid__list">
                    {plants.map((plant) => (
                        <PlantCard key={plant.id} plant={plant} />
                    ))}
                </div>
            ) : (
                <p className="plant-grid__message">Ничего не найдено</p>
            )}
        </div>
    );
};

export default PlantGrid;
