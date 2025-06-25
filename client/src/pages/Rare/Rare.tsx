import { useState, useEffect, useCallback } from 'react';
import { Navigation } from '@/components/Navigation/Navigation';
import type { Observation } from '@/types/rarePlants';
import { fetchObservations } from '@/api/observations';

import './Rare.sass';

const Rare = () => {
    const [observations, setObservations] = useState<Observation[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);

    const loadObservations = useCallback(async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        setError(null);

        try {
            const data = await fetchObservations(page);
            if (data.length === 0) {
                setHasMore(false);
            } else {
                setObservations((prev) => [...prev, ...data]);
                setPage((prev) => prev + 1);
            }
        } catch (err) {
            setError('Ошибка при загрузке данных.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [page, isLoading, hasMore]);

    useEffect(() => {
        loadObservations();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const bottomReached =
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 300;
            if (bottomReached) {
                loadObservations();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadObservations]);

    return (
        <>
            <Navigation />
            <main className="rare">
                <h1 className="rare__title">Редкие виды растений</h1>

                {error && <p className="rare__error">{error}</p>}

                <ul className="rare__list">
                    {observations.map((obs) => {
                        const taxon = obs.taxon;
                        if (!taxon) return null;

                        return (
                            <li key={obs.id} className="rare__item">
                                <div className="rare__item-img__wrapper">
                                    {taxon.default_photo ? (
                                        <img
                                            src={taxon.default_photo.medium_url}
                                            alt={
                                                taxon.preferred_common_name ||
                                                taxon.scientific_name ||
                                                'Фото растения'
                                            }
                                            className="rare__image"
                                            loading="lazy"
                                            onClick={() => {
                                                setModalImageUrl(
                                                    taxon.default_photo
                                                        ?.medium_url || null
                                                );
                                                setIsOpenModal(true);
                                            }}
                                        />
                                    ) : (
                                        <div className="rare__image_placeholder">
                                            Нет фото
                                        </div>
                                    )}
                                </div>

                                <div className="rare__info">
                                    <div className="rare__info-header">
                                        <p>
                                            <strong>Название:</strong>{' '}
                                            {taxon.preferred_common_name ||
                                                'нет данных'}
                                        </p>
                                        <p>
                                            <strong>Научное имя:</strong>{' '}
                                            {taxon.scientific_name ||
                                                'нет данных'}
                                        </p>
                                    </div>

                                    <div className="rare__info-columns">
                                        <div className="rare__info-column">
                                            <p>
                                                <strong>Ранг:</strong>{' '}
                                                {taxon.rank || 'нет данных'}
                                            </p>
                                            <p>
                                                <strong>Категория:</strong>{' '}
                                                {taxon.iconic_taxon_name ||
                                                    'нет данных'}
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
                                                    ? new Date(
                                                          obs.observed_on
                                                      ).toLocaleDateString()
                                                    : 'нет данных'}
                                            </p>
                                            <p>
                                                <strong>Часовой пояс:</strong>{' '}
                                                {obs.created_time_zone ||
                                                    'нет данных'}
                                            </p>
                                            <p>
                                                <strong>ID сообщества:</strong>{' '}
                                                {obs.community_taxon_id ||
                                                    'нет данных'}
                                            </p>
                                            <p>
                                                <strong>Место:</strong>{' '}
                                                {obs.place_guess ||
                                                    'нет данных'}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="rare__description">
                                        <strong>Описание:</strong>{' '}
                                        {obs.description || 'нет описания.'}
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
                                        <p className="rare__wiki">
                                            Ссылка на Wikipedia отсутствует.
                                        </p>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>

                {isLoading && (
                    <p className="rare__status">
                        Загрузка следующей страницы...
                    </p>
                )}
                {!hasMore && <p className="rare__status">Это все данные 🌱</p>}
                {isOpenModal && modalImageUrl && (
                    <div
                        className="modal"
                        onClick={() => setIsOpenModal(false)}
                    >
                        <div
                            className="modal__content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="modal__close"
                                onClick={() => setIsOpenModal(false)}
                            >
                                ×
                            </button>
                            <img
                                src={modalImageUrl}
                                alt="Увеличенное фото растения"
                                className="modal__image"
                            />
                        </div>
                    </div>
                )}
            </main>
        </>
    );
};

export default Rare;
