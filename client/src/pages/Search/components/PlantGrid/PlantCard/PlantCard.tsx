import type { Plant } from '@/types/plant';
import './PlantCard.sass';
import { useState } from 'react';

interface PlantCardProps {
    plant: Plant;
}

const PlantCard = ({ plant }: PlantCardProps) => {
    const {
        common_name,
        scientific_name,
        family,
        default_image,
        genus,
        species_epithet,
        hybrid,
    } = plant;

    const placeholder = `${import.meta.env.BASE_URL}images/placeholder.png`;

    const [imgSrc, setImgSrc] = useState<string>(
        default_image?.regular_url ?? placeholder
    );

    const handleImgError = () => {
        if (imgSrc !== placeholder) {
            setImgSrc(placeholder);
        }
    };

    return (
        <div className="plant-card">
            <img
                src={imgSrc}
                alt={
                    common_name ||
                    scientific_name?.[0] ||
                    'Неизвестное растение'
                }
                className={`plant-card__image ${
                    imgSrc === placeholder
                        ? 'plant-card__image--placeholder'
                        : ''
                }`}
                onError={handleImgError}
            />
            <div className="plant-card__body">
                <h2 className="plant-card__name">
                    {common_name || 'Без названия'}
                </h2>
                <p className="plant-card__scientific">
                    <em>{scientific_name?.join(', ')}</em>
                </p>
                <p className="plant-card__genus">
                    Род: <strong>{genus}</strong>
                </p>
                <p className="plant-card__species">
                    Вид: <strong>{species_epithet}</strong>{' '}
                    {hybrid ? '(гибрид)' : ''}
                </p>
                {family && (
                    <p className="plant-card__family">
                        Семейство: <strong>{family}</strong>
                    </p>
                )}
            </div>
        </div>
    );
};

export default PlantCard;
