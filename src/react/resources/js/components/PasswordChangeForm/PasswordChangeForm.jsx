import { useState } from 'react';
import './PasswordChangeForm.scss';
import { FORM_DATA_HEADER } from '../../assets/headers';

let timerId = null;

function PasswordChangeForm({ email = 'test@test.com' }) {
    const initialState = {
        email,
        password: '',
        password_confirmation: '',
        token: 'token'
    }
    const [currentState, setCurrentState] = useState(initialState);

    const [message, setMessage] = useState(null);

    const showMessage = (msg) => {
        if (timerId) {
            clearTimeout(timerId);
            timerId = null;
        }
        setMessage(msg);

        setTimeout(() => {
            setMessage(null);
            clearTimeout(timerId);
            timerId = null;
        }, 2000);
    }

    const submitHundler = (evt) => {
        evt.preventDefault();

        axios({
            method: 'post',
            url: '/reset-password',
            data: currentState,
            headers: FORM_DATA_HEADER
        })
            .then((response) => {
                console.log(response);

                const {data} = response;

                if (data.status === 'error') {
                    console.log(data);
                    showMessage(data.result.password[0]);
                }

                if (data.status === 'success') {
                    showMessage('Пароль изменен');
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }


    const changeInputHandler = (evt) => {
        evt.preventDefault();

        const { name, value } = evt.target;

        setCurrentState({
            ...currentState,
            [name]: value,
        })
    }

    return (
        <form action="" className="form-pass-change" onSubmit={submitHundler}>
            <div className="form-pass-change__main">
                <div className="form-pass-change__description">
                    Укажите новый пароль:
                </div>
                <div className="form-pass-change__row">
                    <span className="form-pass-change__hint">Пароль:</span>
                    <input
                        type="password"
                        className="form-pass-change__input"
                        name="password"
                        value={currentState.password}
                        onChange={changeInputHandler}
                        required />

                </div>
                <div className="form-pass-change__row">
                    <span className="form-pass-change__hint">Подтверждение пароля:</span>
                    <input
                        type="password"
                        className="form-pass-change__input"
                        name="password_confirmation"
                        value={currentState.password_confirmation}
                        onChange={changeInputHandler}
                        required />
                </div>
                <div className="form-pass-change__row">
                    {message}
                </div>
            </div>
            <div className="form-pass-change__controls">
                <button className="form-pass-change__button form-pass-change__btn-back">
                    <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 -960 960 960" width="24">
                        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                    </svg>
                </button>
                <button className="form-pass-change__button form-pass-change__btn-next">Сменить пароль</button>
            </div>
        </form>
    );
}

export default PasswordChangeForm;