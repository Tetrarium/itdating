import './Header.scss';

function Header() {
    return (
        <header className="header">
            <div className="header__container container">
                <div className="header__logo"><a href="/">Лого</a></div>
                <div className="header__menu">
                    <ul className="menu">
                        <li className="menu__item">Поиск</li>
                        <li className="menu__item">Сообщения</li>
                        <li className="menu__item">Блог</li>
                    </ul>
                </div>
                <div className="header__user-control">
                    <ul className="user-control">
                        <li className="user-control__item">Премиум</li>
                        <li className="user-control__item">Баланс</li>
                        <li className="user-control__item"><a href="/logout">Аккаунт</a></li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header;
