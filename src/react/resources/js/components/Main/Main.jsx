import './Main.scss';

import Athentication from '../Athentication/Athentication';

function Main(props) {
    // console.log(props)
    const register = () => {
        return null;
    }

    const login = () => {
        return null;
    }


    return (
        <main className="main">
            <div className="container">
                <div className="main__row main__top">
                    <div className="main__slogan">
                        <h2 className="slogan">Слоган<br />на пару строк</h2>
                    </div>
                    <div className="main__authentication">
                        <Athentication {...props} />
                    </div>
                </div>
                <div className="main__row main__description">
                    <div className="description">
                        <h2 className="description__title">Описание сервиса</h2>
                        <p className="description__text">Our site is about get cozy place for date it comminity</p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Main;