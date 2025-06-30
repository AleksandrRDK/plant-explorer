import './About.sass';
import { Navigation } from '@/components/Navigation/Navigation';

const About = () => {
    return (
        <>
            <Navigation />
            <div className="nav__offset"></div>
            <section className="about">
                <h1 className="about__title">О проекте PlantExplorer</h1>

                <div className="about__section">
                    <h2 className="about__subtitle">🧱 Структура проекта</h2>
                    <p className="about__text">
                        Проект разделён на две части: <strong>client</strong>{' '}
                        (фронтенд) и <strong>server</strong> (будущий бэкенд).
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
                            <code>vite-env.d.ts</code> — базовые файлы проекта
                        </li>
                    </ul>

                    <h3 className="about__subsubtitle">🌐 public/</h3>
                    <p className="about__text">
                        Папка для статических файлов. Внутри:{' '}
                        <strong>images/</strong> с изображениями
                    </p>

                    <h3 className="about__subsubtitle">⚙️ Корень проекта</h3>
                    <ul className="about__list">
                        <li className="about__item">
                            <strong>client/</strong> — фронтенд (описан выше)
                        </li>
                        <li className="about__item">
                            <strong>server/</strong> — пустой, в будущем будет
                            бэкенд
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

                <div className="about__section">
                    <h2 className="about__subtitle">🌿 Используемые API</h2>
                    <ul className="about__list">
                        <li className="about__item">
                            <strong>Perenual Plant API</strong> — поиск растений
                            и информация о них
                        </li>
                        <li className="about__item">
                            <strong>PlantNet API</strong> — определение растения
                            по загруженному изображению
                        </li>
                    </ul>
                </div>

                <div className="about__section">
                    <h2 className="about__subtitle">🚀 Как запустить проект</h2>
                    <ol className="about__list about__list--ordered">
                        <li className="about__item">
                            Клонируйте репозиторий:{' '}
                            <code>
                                git clone
                                https://github.com/AleksandrRDK/plant-explorer
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
                        <li className="about__item">
                            Убедитесь, что вы указали ключи API в{' '}
                            <code>.env</code>
                        </li>
                    </ol>
                </div>

                <div className="about__section">
                    <h2 className="about__subtitle">
                        🛠️ Используемые технологии
                    </h2>
                    <ul className="about__list">
                        <li className="about__item">React + TypeScript</li>
                        <li className="about__item">Vite</li>
                        <li className="about__item">Sass + CSS переменные</li>
                        <li className="about__item">Docker</li>
                        <li className="about__item">MongoDB (в будущем)</li>
                    </ul>
                </div>
            </section>
        </>
    );
};

export default About;
