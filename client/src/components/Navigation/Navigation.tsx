import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import './Navigation.sass';

export const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="nav">
            <div className="nav__wrapper">
                <button
                    className={`nav__burger ${
                        isOpen ? 'nav__burger--open' : ''
                    }`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span className="nav__burger-line" />
                    <span className="nav__burger-line" />
                    <span className="nav__burger-line" />
                </button>
            </div>
            <div
                className={`nav__menu ${isOpen ? 'nav__menu--open' : ''}`}
                onClick={() => setIsOpen(false)}
            >
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? 'nav__item nav__item--active' : 'nav__item'
                    }
                >
                    🌱 Главная
                </NavLink>
                <NavLink
                    to="/search"
                    className={({ isActive }) =>
                        isActive ? 'nav__item nav__item--active' : 'nav__item'
                    }
                >
                    🔍 Поиск растений
                </NavLink>
                <NavLink
                    to="/identify"
                    className={({ isActive }) =>
                        isActive ? 'nav__item nav__item--active' : 'nav__item'
                    }
                >
                    🧠 Узнать по фото
                </NavLink>
                <NavLink
                    to="/rare"
                    className={({ isActive }) =>
                        isActive ? 'nav__item nav__item--active' : 'nav__item'
                    }
                >
                    🧬 Редкие виды
                </NavLink>
                <NavLink
                    to="/map"
                    className={({ isActive }) =>
                        isActive ? 'nav__item nav__item--active' : 'nav__item'
                    }
                >
                    📍 Карта наблюдений
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        isActive ? 'nav__item nav__item--active' : 'nav__item'
                    }
                >
                    📦 О проекте
                </NavLink>
            </div>
        </nav>
    );
};
