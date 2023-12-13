import { useState } from 'react';
import './RegistrationForm.scss';
import { FORM_DATA_HEADER } from '../../assets/headers';

import axios from 'axios';



const stubHandler = () => {
    console.log('The stub handler has worked!');
}

/**
 * TODO
 * Требуется реализовать месседжи
 * обработки исключений
 */

function RegistrationForm({ tags = [], data, onBackClick = stubHandler, onEndRegistration = stubHandler }) {
    // Данные по квизу получать из состояния родителя. пока заглушка
    // console.log(data);

    const initialState = {
        ...data,
        nick_name: '',
        password: '',
        quiz: tags,
    };

    const [currentState, setCurrentState] = useState(initialState);

    const changeInputHandler = (evt) => {
        evt.preventDefault();

        setCurrentState({
            ...currentState,
            [evt.target.name]: evt.target.value,
        })
    }

    const submitHandler = (evt) => {
        evt.preventDefault();

        console.log(currentState);

        axios({
            method: 'post',
            url: '/register',
            data: currentState,
            headers: FORM_DATA_HEADER,
        })
            .then((response) => {
                console.log(response);
                setCurrentState(initialState);

                // Происходит переход на следующую страницу,
                // которой требуется значение адреса электронной почты
                onEndRegistration(currentState);
            })
            .catch((error) => {
                console.log(error);

                const {response} = error;
                // Временный месседж
                // Нужно реализовать кастомное сообщение
                if (
                    response
                    && response.data
                    && response.data.result
                    && response.data.result.email
                ) {
                    alert(response.data.result.email);
                }
            })
    }

    return (
        <form action="" className="form-reg" onSubmit={submitHandler}>
            <div className="form-req__main">
                <div className="form-reg__row">
                    <span className="form-reg__hint">Имя:</span>
                    <input
                        type="text"
                        className="form-reg__input"
                        name="name"
                        value={currentState.name}
                        onChange={changeInputHandler}
                        required />
                </div>
                <div className="form-reg__row">
                    <span className="form-reg__hint">Email:</span>
                    <input
                        type="email"
                        className="form-reg__input"
                        name="email"
                        value={currentState.email}
                        onChange={changeInputHandler}
                        required />
                </div>
                <div className="form-reg__row">
                <span className="form-reg__hint">Ник:</span>
                <input
                    type="mail"
                    className="form-reg__input"
                    name="nick_name"
                    value={currentState.nick_name}
                    onChange={changeInputHandler}
                    required />
                </div>
                <div className="form-reg__row">
                    <span className="form-reg__hint">Пароль:</span>
                    <input
                        type="password"
                        className="form-reg__input"
                        name="password"
                        value={currentState.password}
                        onChange={changeInputHandler}
                        required />
                </div>
            </div>

            <div className="form-reg__controls">
                <button className="form-reg__button form-reg__btn-back" onClick={onBackClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 -960 960 960" width="24">
                        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                    </svg>
                </button>
                <button className="form-reg__button form-reg__btn-next">Продолжить</button>
            </div>
        </form>
    )
}

export default RegistrationForm;
