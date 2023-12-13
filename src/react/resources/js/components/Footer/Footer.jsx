import './Footer.scss';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__copy">2023 (c) itdating.site</div>
            <div className="footer__contacts">
                <div className="footer__row">
                    <div className="socials">
                        <h3 className="socials__title">Социальные сети</h3>
                        <ul className="socials__items">
                            <div className="socials__item"></div>
                            <div className="socials__item"></div>
                            <div className="socials__item"></div>
                            <div className="socials__item"></div>
                            <div className="socials__item"></div>
                        </ul>
                    </div>
                </div>
                <div className="footer__row">
                    <div className="footer__btns">
                        <button className="footer__btn">Контакты</button>
                        <button className="footer__btn">О нас</button>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
