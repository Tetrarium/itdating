import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { showErrorMessage as showMessage } from '../../assets/utility';
import { fetchChangePassword, fetchLogin } from '../../fetchingAPI/authentication';

import './PasswordChangeForm.scss';

function PasswordChangeForm({params}) {
    const initialState = {
        email: '',
        password: '',
        password_confirmation: '',
        token: '',
        ...params,
    }
    const [currentState, setCurrentState] = useState(initialState);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const submitHundler = async (evt) => {
        evt.preventDefault();

        const result = await fetchChangePassword(currentState);

        if (result.ok) {
            showMessage(result.message, setMessage);
            const timeoutId = setTimeout(async () => {
                const loginResult = await fetchLogin({
                    email: currentState.email,
                    password: currentState.password,
                })

                if (loginResult.ok) {
                    setCurrentState(initialState);
                    navigate('/homepage');
                }
                clearTimeout(timeoutId);
            }, 2500);
        } else {
            showMessage(result.message, setMessage);
        }
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