import { useState } from 'react';
import './PasswordRecoveryForm.scss';
import axios from 'axios';
import { FORM_DATA_HEADER } from '../../assets/headers';

const stubHandler = () => {
    console.log('The stub handler has worked!');
}

function PasswordRecoveryForm({email = '', onBackClick, onSubmitForm }) {
    const initialState = {
        email,
    }

    const [ currentState, setCurrentState ] = useState(initialState);

    const changeInputHandler = (evt) => {
        evt.preventDefault();

        setCurrentState({
            ...currentState,
            [evt.target.name]: evt.target.value,
        })
    }

    const fetchPasswordRecovery = () => {
        axios({
            method: 'post',
            url: '/forgot-password',
            data: currentState,
            headers: FORM_DATA_HEADER,
        })
            .then((response) => {
                console.log('Запрос на восстановление пароля успешен')
                console.log(response);
                // Требуется открыть подтверждающее отправке письма сообщение
                // response.data
                //  {
                //     result: "passwords.throttled",
                //     status: "success",
                //  }
                if (response.data.status = "success") {
                    onSubmitForm(currentState);
                }
            })
            .catch((error) => {
                console.log(error)
            })
    };

    const acceptHandler = (evt) => {
        evt.preventDefault();
        console.log('accept btn');
        console.log(currentState);
        fetchPasswordRecovery();
    };

    const backHandler = (evt) => {
        evt.preventDefault();
        onBackClick();
    };

    return (
        <form action="" className="form-pass-rec" onSubmit={acceptHandler}>
            <div className="form-pass-rec__main">
                <div className="form-pass-rec__description">
                    Укажите адрес электронной почты и мы отправим вам письмо для восстановления пароля:
                </div>
                <div className="form-pass-rec__row">
                    <span className="form-pass-rec__hint">Email</span>
                    <input
                        type="email"
                        className="form-pass-rec__input"
                        name="email"
                        value={currentState.email}
                        onChange={changeInputHandler}
                        required />
                </div>
            </div>
            <div className="form-pass-rec__controls">
                <button
                    className="form-pass-rec__button form-pass-rec__btn-back"
                    onClick={backHandler}
                    type='button'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 -960 960 960" width="24">
                        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                    </svg>
                </button>
                <button
                    className="form-pass-rec__button form-pass-rec__btn-next"
                    type='submit'
                >Подтвердить</button>
            </div>
        </form>
    )
}

export default PasswordRecoveryForm;
