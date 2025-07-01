import { useState, useEffect, useRef } from 'react';
import type { ChangeEvent, ClipboardEvent } from 'react';
import { searchPhoto } from '@/api/searchPhoto';
import type { PlantPhoto } from '@/api/searchPhoto';
import { Navigation } from '@/components/Navigation/Navigation';
import './Identify.sass';

type ErrorWithCode = {
    code?: string;
};

const Identify = () => {
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [selectedOrgan, setSelectedOrgan] = useState('');
    const [results, setResults] = useState<PlantPhoto[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleOrganChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedOrgan(e.target.value);
    };

    const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.type.indexOf('image') !== -1) {
                const file = item.getAsFile();
                if (file) {
                    setImage(file);
                    setPreviewUrl(URL.createObjectURL(file));
                }
            }
        }
    };

    const handleIdentify = async () => {
        if (!image) {
            setError(
                'Пожалуйста, выберите изображение для определения растения.'
            );
            return;
        }

        setIsLoading(true);
        setError(null);
        setResults([]);

        const formData = new FormData();
        formData.append('images', image);
        if (selectedOrgan) {
            formData.append('organs', selectedOrgan);
        }

        try {
            const data = await searchPhoto(formData);
            setResults(data || []);
        } catch (error) {
            let message =
                'Произошла ошибка при определении растения. Попробуйте позже.';

            if (error instanceof TypeError && !navigator.onLine) {
                message = 'Вы оффлайн. Проверьте подключение к интернету.';
            } else if (
                typeof error === 'object' &&
                error !== null &&
                'code' in error &&
                (error as ErrorWithCode).code === 'ERR_NETWORK'
            ) {
                message =
                    'Не удалось подключиться к серверу. Включите VPN или откройте сайт в другом браузере.';
            } else if (error instanceof TypeError) {
                message =
                    'Не удалось подключиться к серверу. Включите VPN или откройте сайт в другом браузере.';
            }

            setError(message);
            console.error('Ошибка при определении растения:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        containerRef.current?.focus();
    }, []);

    return (
        <>
            <Navigation />
            <div className="nav__offset"></div>
            <main className="identify">
                <div
                    className="identify__container"
                    onPaste={handlePaste}
                    ref={containerRef}
                    tabIndex={0}
                >
                    <h1 className="identify__title">Узнать растение по фото</h1>
                    <p className="identify__hint">
                        Сделайте чёткое фото листа или цветка или вставьте
                        скриншот с буфера обмена (Ctrl + V)
                    </p>

                    <div className="identify__upload">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="identify__file"
                        />

                        {previewUrl && (
                            <img
                                src={previewUrl}
                                alt="Превью изображения"
                                className="identify__preview"
                            />
                        )}
                        <p className="identify__organ-label">
                            Уточните, что изображено на фото — это поможет
                            точнее определить растение:
                        </p>

                        <select
                            className="identify__select"
                            value={selectedOrgan}
                            onChange={handleOrganChange}
                        >
                            <option value="">Неизвестно</option>
                            <option value="leaf">Лист</option>
                            <option value="flower">Цветок</option>
                            <option value="fruit">Плод</option>
                            <option value="bark">Кора</option>
                            <option value="habit">Растение целиком</option>
                        </select>

                        <button
                            className="identify__button"
                            onClick={handleIdentify}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Определение...' : 'Определить'}
                        </button>

                        {error && (
                            <div className="identify__error">{error}</div>
                        )}
                    </div>

                    {results.length > 0 && (
                        <ul className="identify__results">
                            {results.map((result, index) => (
                                <li key={index} className="identify__result">
                                    {result.images?.length > 0 && (
                                        <img
                                            src={result.images[0].url.s}
                                            alt="Изображение растения"
                                            className="identify__result-image"
                                        />
                                    )}

                                    <div className="identify__result-info">
                                        <h3 className="identify__result-name">
                                            {
                                                result.species
                                                    .scientificNameWithoutAuthor
                                            }
                                        </h3>
                                        <p className="identify__result-score">
                                            Вероятность:{' '}
                                            {(result.score * 100).toFixed(1)}%
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </>
    );
};

export default Identify;
