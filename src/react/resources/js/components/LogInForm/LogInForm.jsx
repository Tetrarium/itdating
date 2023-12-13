import { useState } from 'react';
import './LogInForm.scss';
import axios from 'axios';

import { FORM_DATA_HEADER } from '../../assets/headers';

const stubHandler = () => {
    console.log('The stub handler has worked!');
  }

function LogInForm({setIsLogIn, onForgotPass = stubHandler}) {
    const initialState = {
        email: '',
        password: '',
    };

    const [currentState, setCurrentState] = useState(initialState);

    const changeInputHandler = (evt) => {
        evt.preventDefault();

        setCurrentState({
            ...currentState,
            [evt.target.name]: evt.target.value,
        })
    }

    const submitHundler = (evt) => {
        evt.preventDefault();

        // console.log(currentState)
        // const data = objectToFormData(currentState);
        // console.log(Object.fromEntries(data.entries()));

        axios({
            method: 'post',
            url: '/login',
            data: currentState,
            headers: FORM_DATA_HEADER,
        })
            .then((response) => {
                console.log(response);
                setCurrentState(initialState);
                setIsLogIn(true);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const forgotPassHandler = (evt) => {
        evt.preventDefault();
        onForgotPass();
    }

    return (
        <form action="" className="form-log hidden" onSubmit={submitHundler}>
            <div className="form-log__main">
                <div className="form-log__row">
                    <span className="form-log__hint">Email</span>
                    <input
                        type="email"
                        className="form-log__input"
                        name="email"
                        value={currentState.email}
                        onChange={changeInputHandler}
                        required />
                </div>
                <div className="form-log__row">
                    <span className="form-log__hint">Пароль:</span>
                    <input
                        type="password"
                        className="form-log__input"
                        name="password"
                        value={currentState.password}
                        onChange={changeInputHandler}
                        required />
                </div>
                <div className="form-log__help">
                    <a href="/forgot-password" className="form-log__link" onClick={forgotPassHandler}>Забыли пароль?</a>
                </div>
            </div>
            <div className="form-log__description">
                Нажимая “Войти”, вы соглашаетесь с условиями использования и политикой конфиденциальности
            </div>
            <div className="form-log__controls">
                {/* Пока непонятно назначение кнопки назад */}
                <div>
                    <button className="form-log__button form-log__btn-back" style={{ display: 'none' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 -960 960 960" width="24">
                            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                        </svg>
                    </button>
                </div>
                <div>
                    <button className="form-log__button form-log__btn-next">Войти</button>
                </div>
            </div>
        </form>
    )
}

export default LogInForm;