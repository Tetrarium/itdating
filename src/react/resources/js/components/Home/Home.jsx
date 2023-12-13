import './Home.scss';
import Img_An from './images/an.png'
import Profiles from '../Profiles/Profiles.jsx'
import {useState} from "react";

function Home(props) {

    const WidgetTypes = {
        LIST: 'LIST',
        PROFILE: 'PROFILE',
    };

    const [ widgetType, setWidgetType ] = useState(WidgetTypes.LIST);

    return (
        <main className="main">
            <div className="container">
                <div className="main__row main__top">
                    {/*<div className="main__slogan">
                        <h2 className="slogan">Слоган<br />на пару строк</h2>
                    </div> */}
                    <div className="main__messenger">

                        <div className="messenger__row">
                            <div className="messenger__button">
                                Все
                            </div>
                            <div className="messenger__button">
                                Онлайн
                            </div>
                            <div className="messenger__button">
                                Избранные
                            </div>
                        </div>
                        <div className="messenger__userrow">
                            <div className="messenger__user">
                                <div className="messenger__avatar">
                                </div>

                                <div className="messenger__info">
                                    <div className="messenger__username">
                                        Служба поддержки
                                        <div className="messenger__online">

                                        </div>
                                    </div>
                                    <div className="messenger__last-message">
                                        Здравствуйте! Мы рады видеть вас здесь. Чтобы новые знакомства были эффективнее, советуем загрузить свои
                                    </div>
                                </div>
                            </div> {/* messenger__user */}

                            <div className="messenger__user">
                                <div className="messenger__avatar">
                                    <img src={Img_An}></img>
                                </div>

                                <div className="messenger__info">
                                    <div className="messenger__username">
                                        An, 33
                                        <div className="messenger__online">

                                        </div>
                                    </div>
                                    <div className="messenger__last-message">
                                       Привет, как ты?
                                    </div>
                                </div>
                            </div> {/* messenger__user */}

                        </div> {/* messenger__userrow*/}

                    </div> {/* main_messenger */}

                    {widgetType === WidgetTypes.LIST ? <Profiles /> : null}
                    {/*widgetType === WidgetTypes.LOGIN ? <LogInForm setIsLogIn={props.setIsLogIn} /> : null*/}


                    </div>

                </div>
        </main>
    );
}

export default Home;