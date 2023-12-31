import { Link, NavLink } from 'react-router-dom';

import './Header.scss';

function Header() {
    return (
        <header className="header">
            <div className="header__container container">
                <div className="header__logo"><a href="/">Лого</a></div>
                <div className="header__menu">
                    <ul className="menu">
                        <li className="menu__item">
                            <NavLink
                                className='menu__nav'
                                to='/homepage/users'
                            >Поиск</NavLink>
                        </li>
                        <li className="menu__item">
                            <NavLink
                                className='menu__nav'
                                to='/homepage/me'
                            >Моя анкета</NavLink>
                        </li>
                        <li className="menu__item">Сообщения</li>
                        <li className="menu__item">Блог</li>
                    </ul>
                </div>
                <div className="header__user-control">
                    <ul className="user-control">
                        <li className="user-control__item">Премиум</li>
                        <li className="user-control__item">Баланс</li>
                        <li className="user-control__item"><a aria-disabled>Аккаунт</a></li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header;
