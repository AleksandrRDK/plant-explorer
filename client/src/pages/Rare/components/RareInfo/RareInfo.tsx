import './RareInfo.sass';

import type { Observation } from '@/types/rarePlants';

interface RareInfoProps {
    taxon: Observation['taxon'];
    obs: Observation;
}

const RareInfo = ({ taxon, obs }: RareInfoProps) => {
    if (!taxon) return null;
    return (
        <div className="rare__info">
            <div className="rare__info-header">
                <p>
                    <strong>Название:</strong>{' '}
                    {taxon.preferred_common_name || 'нет данных'}
                </p>
                <p>
                    <strong>Научное имя:</strong>{' '}
                    {taxon.scientific_name || 'нет данных'}
                </p>
            </div>

            <div className="rare__info-columns">
                <div className="rare__info-column">
                    <p>
                        <strong>Ранг:</strong> {taxon.rank || 'нет данных'}
                    </p>
                    <p>
                        <strong>Категория:</strong>{' '}
                        {taxon.iconic_taxon_name || 'нет данных'}
                    </p>
                    <p>
                        <strong>Вымерший вид:</strong>{' '}
                        {taxon.extinct ? 'да' : 'нет'}
                    </p>
                </div>

                <div className="rare__info-column">
                    <p>
                        <strong>Дата:</strong>{' '}
                        {obs.observed_on
                            ? new Date(obs.observed_on).toLocaleDateString()
                            : 'нет данных'}
                    </p>
                    <p>
                        <strong>Часовой пояс:</strong>{' '}
                        {obs.created_time_zone || 'нет данных'}
                    </p>
                    <p>
                        <strong>ID сообщества:</strong>{' '}
                        {obs.community_taxon_id || 'нет данных'}
                    </p>
                    <p>
                        <strong>Место:</strong>{' '}
                        {obs.place_guess || 'нет данных'}
                    </p>
                </div>
            </div>

            <p className="rare__description">
                <strong>Описание:</strong> {obs.description || 'нет описания.'}
            </p>

            {taxon.wikipedia_url ? (
                <p className="rare__wiki">
                    <a
                        href={taxon.wikipedia_url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Подробнее на Wikipedia
                    </a>
                </p>
            ) : (
                <p className="rare__wiki">Ссылка на Wikipedia отсутствует.</p>
            )}
        </div>
    );
};

export default RareInfo;
