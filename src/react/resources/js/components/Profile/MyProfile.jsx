import { useEffect, useState } from "react";
// import Profile from "../Profile/Profile";
import { fetchChangeMe, fetchMe } from "../../fetchingAPI/users";
import { getBodyPrefs } from "../../assets/utility";

import './Profile.scss';

import PrefsSelect from "../UI/PrefsSelect/PrefsSelect";
import PrefEnums from "./PrefEnums";
import EditableInput from "../UI/EditableInput/EditableInput";
import Modal from "../UI/Modal/Modal";
import AddPhotoForm from "../AddPhotoForm/AddPhotoForm";
import Checkbox from "../UI/Checkbox/Checkbox";

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

function MyProfile() {
    const [user, setUser] = useState(null);

    const [state, setState] = useState({
        body_type: '',
        eye_color: '',
        hair_color: '',
    });

    const [activeAddPhoto, setActiveAddPhoto] = useState(false);

    const handleChange = async ({ name, value }) => {

        const result = await fetchChangeMe({
            field: name,
            value,
            user_id: user.id,
        });

        if (result.ok) {
            getMe();
        }

        setState({
            ...state,
            [name]: value,
        });
    }

    const handleChangeSelect = (evt) => {
        evt.preventDefault();

        const { name, value } = evt.target;
        handleChange({ name, value });
    }

    const getMe = async () => {
        const response = await fetchMe();
        if (response.ok) {
            setUser(response.user);
        }
    }

    useEffect(() => {
        getMe();
    }, []);

    if (!user) {
        return <div>Ошибка загрузки пользователя</div>
    }

    const openAddPhoto = () => {
        setActiveAddPhoto(true);
    }

    const closeAddPhoto = () => {
        setActiveAddPhoto(false);
    }

    const { prefs, info } = user;
    // console.log(info);
    console.log(user);

    return (
        <>
            <div className="profile">
                {/* Header */}
                <div className="profile__row">
                    <div className="profile__logo" onClick={openAddPhoto}>
                        {user.photo_url
                            ? <img className="profile__photo" src={user.photo_url} alt={user.name} />
                            : <div className="profile__photo profile__photo_missing" />
                        }

                    </div>
                    <div className="profile__header">
                        <div className="profile__name">
                            {user.name},&nbsp;
                            {<EditableInput
                                name="age"
                                placeholder="Укажите возраст"
                                onChange={handleChange}
                                info={info}
                            />}
                            <div className="messenger__online"></div>
                        </div>
                        <div className="profile__city">
                            <EditableInput
                                name='city'
                                placeholder='Укажите город'
                                onChange={handleChange}
                                info={info}
                            />
                        </div>
                        <div className="profile__country">
                            <EditableInput
                                name='country'
                                placeholder='Укажите страну'
                                onChange={handleChange}
                                info={info}
                            />
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
                        {/* О себе */}
                        <EditableInput
                            name='spend_time'
                            placeholder='Провожу время'
                            onChange={handleChange}
                            info={info}
                        />
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
                                <PrefsSelect
                                    label='Телосложение'
                                    name='body_type'
                                    prefs={getBodyPrefs(user)}
                                    value={info.body_type}
                                    onChange={handleChangeSelect}
                                />
                            </li>
                            <li className="profile-list__item">
                                <PrefsSelect
                                    label='Цвет глаз'
                                    name='eye_color'
                                    prefs={prefs.eye_color}
                                    value={info.eye_color}
                                    onChange={handleChangeSelect}
                                />
                            </li>
                            <li className="profile-list__item">
                                <PrefsSelect
                                    label='Цвет волос'
                                    name='hair_color'
                                    prefs={prefs.hair_color}
                                    value={info.hair_color}
                                    onChange={handleChangeSelect}
                                />
                            </li>
                            <li className="profile-list__item">
                                Особенности:
                                <div className="profile-list__features">
                                    <PrefEnums
                                        info={info}
                                        onChange={handleChange}
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
                                <PrefsSelect
                                    label='Отношение к мясу'
                                    name='food_prefs'
                                    prefs={prefs.food_prefs}
                                    value={info.food_prefs}
                                    onChange={handleChangeSelect}
                                />
                            </li>
                            <li className="profile-list__item">
                                <PrefsSelect
                                    label='Алкоголь'
                                    name='alco_prefs'
                                    prefs={prefs.alco_prefs}
                                    value={info.alco_prefs}
                                    onChange={handleChangeSelect}
                                />
                            </li>
                            <li className="profile-list__item">
                                <PrefsSelect
                                    label='Курение'
                                    name='smoking'
                                    prefs={[0, 1]}
                                    value={info.smoking}
                                    onChange={handleChangeSelect}
                                />
                            </li>
                        </ul>
                    </div>
                    <div className="profile__col">
                        <div className="profile__subtitle">
                            Хобби
                        </div>
                        <div className="profile-list__features">
                            <PrefEnums
                                info={info}
                                onChange={handleChange}
                                features={hobbyFeatures}
                            />
                        </div>
                    </div>
                </div>
                <div className="profile__row">
                    <div className="profile__col">
                        <div className="profile__presents">
                            Мои значки
                        </div>
                        <Checkbox
                            label='Checkbox'
                            checked={true}
                        />
                    </div>

                    <div className="profile__col">
                        <div className="profile__presents">
                            Мои подарки
                        </div>
                    </div>

                    <div className="profile__col profile__col-share">
                        <div className="profile__presents">
                            Поделиться анкетой
                        </div>
                    </div>
                </div>

            </div>
            <Modal
                active={activeAddPhoto}
                onOpen={openAddPhoto}
                onClose={closeAddPhoto}
            >
                <AddPhotoForm
                    // user={user}
                    name='photo_url'
                    onClose={closeAddPhoto}
                    onSubmit={handleChange}
                />
            </Modal>
        </>
    )
}

export default MyProfile;
