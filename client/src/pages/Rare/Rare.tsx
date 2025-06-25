import { useState, useEffect, useCallback, useRef } from 'react';
import { Navigation } from '@/components/Navigation/Navigation';
import type { Observation } from '@/types/rarePlants';
import { fetchObservations } from '@/api/observations';

import './Rare.sass';
import RareInfo from './components/RareInfo/RareInfo';

const Rare = () => {
    const [observations, setObservations] = useState<Observation[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);

    const isLoadingRef = useRef(false);

    const loadObservations = useCallback(
        async (pageToLoad: number) => {
            if (isLoadingRef.current || !hasMore) return;

            isLoadingRef.current = true;
            setIsLoading(true);
            setError(null);

            try {
                const data = await fetchObservations(pageToLoad);
                if (data.length === 0) {
                    setHasMore(false);
                } else {
                    setObservations((prev) => [...prev, ...data]);
                    setPage(pageToLoad + 1);
                }
            } catch (err) {
                setError('Ошибка при загрузке данных.');
                console.error(err);
            } finally {
                isLoadingRef.current = false;
                setIsLoading(false);
            }
        },
        [hasMore]
    );

    useEffect(() => {
        loadObservations(1);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const bottomReached =
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 300;

            if (bottomReached && !isLoadingRef.current && hasMore) {
                loadObservations(page);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadObservations, page, hasMore]);

    return (
        <>
            <Navigation />
            <main className="rare">
                <h1 className="rare__title">Редкие виды растений</h1>

                {error && <p className="rare__error">{error}</p>}

                <ul className="rare__list">
                    {observations.map((obs, index) => {
                        const taxon = obs.taxon;
                        if (!taxon) return null;

                        return (
                            <li
                                key={`${obs.id}-${index}`}
                                className="rare__item"
                            >
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
                                <RareInfo taxon={taxon} obs={obs} />
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
