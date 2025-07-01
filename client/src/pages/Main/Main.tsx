import { Navigation } from '../../components/Navigation/Navigation';
import './Main.sass';
import { quotes } from '@/constants/quotes';

const Main = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    return (
        <>
            <Navigation />
            <div className="nav__offset"></div>
            <main className="home-page">
                <div className="home-page__background-leaves" />
                <div className="home-page__content">
                    <h1 className="home-page__title">
                        PlantExplorer — всё о растениях
                    </h1>
                    <p className="home-page__tagline">
                        Твой надежный гид в мире зелёных друзей
                    </p>
                    <section className="home-page__about-project">
                        <p>
                            PlantExplorer помогает быстро найти информацию о
                            растениях, определить их по фото и узнать о редких
                            видах. Здесь собрана большая база, удобные
                            инструменты и полезные советы для любителей природы.
                        </p>
                    </section>
                    <section className="home-page__features">
                        <div className="home-page__feature">
                            <span
                                role="img"
                                aria-label="Поиск"
                                className="home-page__feature-icon"
                            >
                                🔍
                            </span>
                            <p className="home-page__feature-text">
                                Поиск растений — быстрый и удобный
                            </p>
                        </div>
                        <div className="home-page__feature">
                            <span
                                role="img"
                                aria-label="Узнать по фото"
                                className="home-page__feature-icon"
                            >
                                🧠
                            </span>
                            <p className="home-page__feature-text">
                                Узнать по фото — загрузите фото, и мы поможем с
                                определением
                            </p>
                        </div>
                        <div className="home-page__feature">
                            <span
                                role="img"
                                aria-label="Редкие растения"
                                className="home-page__feature-icon"
                            >
                                🌼
                            </span>
                            <p className="home-page__feature-text">
                                Редкие растения — откройте для себя уникальные
                                виды
                            </p>
                        </div>
                    </section>
                    <div className="home-page__wrapper-plant-quote">
                        <blockquote className="home-page__plant-quote">
                            {randomQuote}
                        </blockquote>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Main;
