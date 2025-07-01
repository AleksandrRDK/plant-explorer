import './About.sass';
import { Navigation } from '@/components/Navigation/Navigation';

const About = () => {
    const scrollToId = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <Navigation />
            <div className="nav__offset"></div>
            <section className="about">
                <h1 className="about__title">О проекте PlantExplorer</h1>

                <div className="about__local-nav">
                    <ul className="about__local-nav-list">
                        <li>
                            <button onClick={() => scrollToId('structure')}>
                                Структура
                            </button>
                        </li>
                        <li>
                            <button onClick={() => scrollToId('api')}>
                                API
                            </button>
                        </li>
                        <li>
                            <button onClick={() => scrollToId('run')}>
                                Запуск
                            </button>
                        </li>
                        <li>
                            <button onClick={() => scrollToId('tech')}>
                                Технологии
                            </button>
                        </li>
                    </ul>
                </div>

                <div className="about__main-section" id="structure">
                    <div className="about__section">
                        <h2 className="about__subtitle">
                            🧱 Структура проекта
                        </h2>
                        <p className="about__text">
                            Проект разделён на две части:{' '}
                            <strong>client</strong> (фронтенд) и{' '}
                            <strong>server</strong> (будущий бэкенд).
                        </p>

                        <h3 className="about__subsubtitle">📁 client/src</h3>
                        <ul className="about__list">
                            <li className="about__item">
                                <strong>api/</strong> — запросы к внешним API
                                (Perenual, PlantNet и др.)
                            </li>
                            <li className="about__item">
                                <strong>components/</strong> — переиспользуемые
                                компоненты. Сейчас: Navigation
                            </li>
                            <li className="about__item">
                                <strong>constants/</strong> — константы и
                                вспомогательные данные
                            </li>
                            <li className="about__item">
                                <strong>pages/</strong> — страницы сайта:
                                <ul className="about__sublist">
                                    <li>Main, Rare, Identify и др.</li>
                                    <li>
                                        Внутри некоторых —{' '}
                                        <strong>components/</strong> с
                                        подкомпонентами (например: RareInfo,
                                        RareModal)
                                    </li>
                                </ul>
                            </li>
                            <li className="about__item">
                                <strong>styles/</strong> — глобальные стили:{' '}
                                <code>index.sass</code> с переменными и{' '}
                                <code>reset.scss</code>
                            </li>
                            <li className="about__item">
                                <strong>types/</strong> — пользовательские типы
                                TypeScript
                            </li>
                        </ul>

                        <h3 className="about__subsubtitle">
                            🔧 Остальные файлы client/
                        </h3>
                        <ul className="about__list">
                            <li className="about__item">
                                <code>App.tsx</code>, <code>Main.tsx</code>,{' '}
                                <code>vite-env.d.ts</code> — базовые файлы
                                проекта
                            </li>
                        </ul>

                        <h3 className="about__subsubtitle">🌐 public/</h3>
                        <p className="about__text">
                            Папка для статических файлов. Внутри:{' '}
                            <strong>images/</strong> с изображениями
                        </p>

                        <h3 className="about__subsubtitle">
                            ⚙️ Корень проекта
                        </h3>
                        <ul className="about__list">
                            <li className="about__item">
                                <strong>client/</strong> — фронтенд (описан
                                выше)
                            </li>
                            <li className="about__item">
                                <strong>server/</strong> — пустой, в будущем
                                будет бэкенд
                            </li>
                            <li className="about__item">
                                <code>docker-compose.yml</code> — конфигурация
                                Docker
                            </li>
                            <li className="about__item">
                                Файлы конфигурации: <code>Dockerfile</code>,{' '}
                                <code>tsconfig.json</code>,{' '}
                                <code>vite.config.ts</code>,{' '}
                                <code>eslint.config.js</code>, и др.
                            </li>
                        </ul>
                    </div>
                    <div className="about__img__wrapper">
                        <img
                            src={`${
                                import.meta.env.BASE_URL
                            }images/screen/main-screen.png`}
                            alt="photo vs-code 1"
                        />
                        <img
                            src={`${
                                import.meta.env.BASE_URL
                            }images/screen/detail-screen.png`}
                            alt="photo vs-code 2"
                        />
                    </div>
                </div>

                <div className="about__section" id="api">
                    <h2 className="about__subtitle">🌿 Используемые API</h2>

                    <ul className="about__list">
                        <li className="about__item">
                            <strong>Perenual Plant API</strong> — основной
                            источник данных на странице «Поиск растений». Здесь
                            мы отображаем широкий каталог растений с подробной
                            информацией. На странице доступен удобный поиск —
                            введите название или часть названия растения, и
                            система покажет соответствующие результаты.
                        </li>

                        <li className="about__item">
                            <strong>PlantNet API</strong> — служит для
                            определения растения по фотографии на странице
                            «Узнать по фото». Вы можете загрузить снимок
                            растения, и API выдаст наиболее вероятные совпадения
                            с указанием процента сходства. Обратите внимание,
                            что из-за особенностей работы API, эта функция может
                            не работать в Яндекс браузере. В таких случаях
                            рекомендуется использовать Google Chrome или
                            включить VPN.
                        </li>

                        <li className="about__item">
                            <strong>iNaturalist API</strong> — используется на
                            страницах «Редкие виды» и «Карта наблюдений». На
                            странице «Редкие виды» мы показываем список
                            растений, которые находятся под угрозой
                            исчезновения. А на «Карте наблюдений» вы увидите
                            интерактивную карту с метками растений. Клик по
                            метке откроет информацию о виде, источник фотографии
                            и само изображение, которое можно увеличить для
                            детального просмотра. Также на этой странице есть
                            фильтры: поиск по названию растения и выбор страны,
                            чтобы узнать, где именно произрастают интересующие
                            вас виды.
                        </li>
                    </ul>
                </div>

                <div className="about__section" id="run">
                    <h2 className="about__subtitle">🚀 Как запустить проект</h2>
                    <ol className="about__list about__list--ordered">
                        <li className="about__item">
                            Клонируйте репозиторий:{' '}
                            <code>
                                git clone
                                https://github.com/AleksandrRDK/plant-explorer.git
                            </code>
                        </li>
                        <li className="about__item">
                            Перейдите в папку <code>client</code>:{' '}
                            <code>cd client</code>
                        </li>
                        <li className="about__item">
                            Установите зависимости: <code>npm install</code>
                        </li>
                        <li className="about__item">
                            Запустите локальный сервер: <code>npm run dev</code>
                        </li>
                        <li className="about__item">Откройте localhost:5173</li>
                    </ol>
                </div>

                <div className="about__section" id="tech">
                    <h2 className="about__subtitle">
                        🛠️ Используемые технологии
                    </h2>
                    <ul className="about__list">
                        <li className="about__item">React + TypeScript</li>
                        <li className="about__item">Vite</li>
                        <li className="about__item">Sass + CSS переменные</li>
                        <li className="about__item">Docker</li>
                    </ul>
                </div>

                <button
                    className="scroll-to-top"
                    onClick={() =>
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                >
                    ↑
                </button>
            </section>
        </>
    );
};

export default About;
