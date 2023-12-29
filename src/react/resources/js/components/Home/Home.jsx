import { useEffect, useState} from "react";
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import { fetchLogout } from "../../fetchingAPI/authentication.js";
import { fetchMe } from "../../fetchingAPI/users.js";
import { showErrorMessage } from "../../assets/utility.js";

import './Home.scss';

import Img_An from './images/an.png'
import ProfilesList from '../ProfilesList/ProfilesList.jsx'
import Profile from '../Profile/Profile.jsx'
import Filter from '../Filter/Filter.jsx';
import MyProfile from "../Profile/MyProfile.jsx";

function Home(props) {
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();
    const locationApp = useLocation();
    // console.log(locationApp.state);

    useEffect(() => {
        if (locationApp.state && locationApp.state.isEmailVerified) {
            console.log(locationApp.state.message);
            showErrorMessage(locationApp.state.message, setMessage);
        }
    }, [locationApp.state]);



    const WidgetTypes = {
        LIST: 'LIST',
        PROFILE: 'PROFILE',
    };

    const logout = async (evt) => {
        evt.preventDefault();

        const state = await fetchLogout();
        if (state) {
            navigate('/login');
            location.reload();
        }

        console.log('Выйти!');
    }

    const [ widgetType, setWidgetType ] = useState(WidgetTypes.LIST);
    const [userId, setUserid] = useState(-1);

    /**
     * Callback для
     **/
    const toggleWidgets = (type, userId) => {
        setUserid(userId);
    }

    const handleLogout = async (evt) => {
        evt.preventDefault();

        const state = await fetchLogout();
        if (state) {
            navigate('/login');
            location.reload();
        }

        console.log('Выйти!');
    }

    return (
        <main className="main">
            {message && (
                <div className="main__popup-message">{message}</div>
            )}
            <button onClick={fetchMe} style={{position: 'absolute', padding: '5px 20px'}}>Кто я</button>
            <button className="tmp tmp__btn" onClick={handleLogout}>Выйти</button>
            <Filter />
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

                    <div className='main__widgets'>
                        {/* {userId !== -1 ? <Profile userId={userId} /> : null} */}
                        {/* {userId === -1 ? <ProfilesList profileClicked={toggleWidgets} /> : null} */}
                        <Routes>
                            {/* <Route index element={<Navigate to='/homepage/users' />} /> */}
                            <Route path="/users" element={<ProfilesList />} />
                            <Route path="/users/:userId" element={<Profile />} />
                            <Route path="/me" element={<MyProfile />} />

                            {/* <Route path="/chat" element={'ОКНО ЧАТА'} /> */}
                        </Routes>
                    </div>
                    </div>

                </div>
        </main>
    );
}

export default Home;