import { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import { fetchUser } from '../../fetchingAPI/users.js';

const lookFeatures = {
    piercing: 'Пирсинг',
    scars: 'Шрамы',
    tatoos: 'Татуировки',
    tunnels: 'Туннели',
    look_other: 'Другое',
}

const hobbyFeatures = {
    bike: 'Велосипед',
    cinema: 'Кино',
    games: 'Игры',
    music: 'Музыка',
    self_dev: 'Саморазвитие',
    travel: 'Путешевствия',
    yoga: 'Йога',
    hobby_other: 'Другое',
}

import './Profile.scss'

function Profile() {
    const { userId } = useParams();

    // console.log(userId);

    const [user, setUser] = useState(null);


    const fillContent = async () => {
        const result = await fetchUser({ userId });

        if (result.ok) {
            const { user } = result;
            console.log('User:');
            console.log(user);
            setUser(user);
        }
    }

    useEffect(() => {
        console.log('Profile loaded');
        console.log(userId);
        fillContent();
    }, []);

    if (!user) {
        return <div>Ошибка загрузки пользователя</div>
    }

    const { info } = user;

    console.log(user);
    console.log(info);

    return (
        <div className="profile">
            {/* Header */}
            <div className="profile__row">
                <div className="profile__logo">
                    {user.photo_url
                        ? <img className="profile__photo" src={user.photo_url} alt={user.name} />
                        : <div className="profile__photo profile__photo_missing" />
                    }
                </div>
                <div className="profile__header">
                    <div className="profile__name">
                        {user.name},&nbsp;{info.age}
                        <div className="messenger__online"></div>
                    </div>
                    <div className="profile__city">
                        {info.city}
                    </div>
                    <div className="profile__country">
                        {info.country}
                    </div>
                    <div className="profile__status">
                        Мое настроение сегодня..
                    </div>
                    <div className="profile__short">
                        Немного о себе...
                    </div>
                </div>
                <div className="profile__actions">
                    <div className="actions">
                        <div className="actions__button">
                            Подмигнуть
                        </div>
                        <div className="actions__button">
                            Написать
                        </div>
                        <div className="actions__button">
                            Отправить подарок
                        </div>
                        <div className="actions__button">
                            Добавить в избранные
                        </div>
                    </div>
                </div>
            </div>
            {/* Gallery */}
            <div className="profile__row">
                <div className="profile-galery">
                    <img
                        src="https://localhost/storage/woman-standing-on-seashore-while-holding-his-white-dress-wS5BdOr12T4.jpg"
                        alt="Veronica"
                        className="profile-galery__item"
                    />
                    <img
                        src="https://localhost/storage/smiling-woman-touching-her-hair-08yuHdEW6Lc.jpg"
                        alt="Veronica"
                        className="profile-galery__item"
                    />
                    <img
                        src="https://localhost/storage/woman-standing-on-seashore-while-holding-his-white-dress-wS5BdOr12T4.jpg"
                        alt="Veronica"
                        className="profile-galery__item"
                    />
                    <img
                        src="https://localhost/storage/woman-standing-on-seashore-while-holding-his-white-dress-wS5BdOr12T4.jpg"
                        alt="Veronica"
                        className="profile-galery__item"
                    />
                </div>
            </div>
            {/* About */}
            <div className="profile__row">
                <div className="profile__bio">
                    {info.spend_time}
                </div>
            </div>
            {/* Features */}
            <div className="profile__row">
                <div className="profile__col">
                    <div className="profile__subtitle">
                        Внешность
                    </div>
                    <ul className="profile__info profile-list">
                        <li className="profile-list__item">
                            <ProfileItem
                                info={info}
                                name={'body_type'}
                                title={'Телосложение'}
                            />
                        </li>
                        <li className="profile-list__item">
                            <ProfileItem
                                info={info}
                                name={'eye_color'}
                                title={'Цвет глаз'}
                            />
                        </li>
                        <li className="profile-list__item">
                            <ProfileItem
                                info={info}
                                name={'hair_color'}
                                title={'Цвет волос'}
                            />
                        </li>
                        <li className="profile-list__item">
                            Особенности:
                            <div className="profile-list__features">
                                <Features
                                    info={info}
                                    features={lookFeatures}
                                />
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="profile__col">
                    <div className="profile__subtitle">
                        Lifestyle
                    </div>
                    <ul className="profile__info profile-list">
                        <li className="profile-list__item">
                            <ProfileItem
                                info={info}
                                name={'food_prefs'}
                                title={'Отношение к мясу'}
                            />
                        </li>
                        <li className="profile-list__item">
                            <ProfileItem
                                info={info}
                                name={'alco_prefs'}
                                title={'Алкоголь'}
                            />
                        </li>
                        <li className="profile-list__item">
                            <ProfileItem
                                info={info}
                                name={'smoking'}
                                title={'Курение'}
                            />
                        </li>
                    </ul>
                </div>
                <div className="profile__col">
                    <div className="profile__subtitle">
                        Хобби
                    </div>
                    <div className="profile-list__features">
                        <Features
                            info={info}
                            features={hobbyFeatures}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;

function ProfileItem({ info, name, title }) {
    console.log(name, info, );

    function getValue() {
        const value = info[name];
        if (typeof value === 'number') {
            if (value === 0) {
                return 'нет';
            }
            if (value === 1) {
                return 'да';
            }
        }

        if (typeof value === 'string') {
            if (value.length === 0) {
                return 'Не указано'
            } else {
                return value;
            }
        }
    
        return 'Не указано';
    }
    
    return (
        <div className="profile-item">
            <span className="profile-item__title">{title}</span>
            <span className="profile-item__value">{getValue()}</span>
        </div>
    )
}

function Features({ info, features }) {
    const isShowFeature = (feature) => {
        if (typeof feature === 'string') {
            return feature.length > 0;
        }

        return feature === 1;
    }

    const getFeature = ({ key, info, map }) => {
        if (typeof info[key] === 'number') {
            return map[key];
        }

        return info[key];
    }

    return (
        <div className="pref-enums">
            {Object.entries(features).map(([key]) => {
                if (isShowFeature(info[key])) {
                    return <div key={key} className="pref-enums__item">{getFeature({ key, info, map: features })}</div>
                }
            })}
        </div>
    )
}
