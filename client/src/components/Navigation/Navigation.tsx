import { NavLink } from 'react-router-dom';
import './Navigation.sass';

export const Navigation = () => {
    return (
        <nav className="nav">
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
                to="/favorites"
                className={({ isActive }) =>
                    isActive ? 'nav__item nav__item--active' : 'nav__item'
                }
            >
                🌼 Мои избранные
            </NavLink>
            <NavLink
                to="/about"
                className={({ isActive }) =>
                    isActive ? 'nav__item nav__item--active' : 'nav__item'
                }
            >
                📦 О проекте
            </NavLink>
        </nav>
    );
};
