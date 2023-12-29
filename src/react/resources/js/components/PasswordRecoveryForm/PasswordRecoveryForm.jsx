import { useState } from 'react';
import { fetchPasswordRecovery } from '../../fetchingAPI/authentication';
import { showErrorMessage } from '../../assets/utility';

import './PasswordRecoveryForm.scss';

const stubHandler = () => {
    console.log('The stub handler has worked!');
}

function PasswordRecoveryForm({email = '', onBackClick, onSubmitForm }) {
    const initialState = {
        email,
    }

    const [ currentState, setCurrentState ] = useState(initialState);
    const [ message, setMessage ] = useState(null);

    const handleChangeInput = (evt) => {
        evt.preventDefault();

        setCurrentState({
            ...currentState,
            [evt.target.name]: evt.target.value,
        })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        
        const result = await fetchPasswordRecovery(currentState);

        if (result.ok) {
            onSubmitForm(currentState);
        } else {
            console.log(result);
            console.log(result.message);
            showErrorMessage(result.message, setMessage);
        }
    }

    const handleBackClick = (evt) => {
        evt.preventDefault();
        onBackClick();
    };

    return (
        <form action="" className="form-pass-rec" onSubmit={handleSubmit}>
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
                        onChange={handleChangeInput}
                        required />
                </div>
                <div className="form-pass-rec__row">
                    {message}
                </div>
            </div>
            <div className="form-pass-rec__controls">
                <button
                    className="form-pass-rec__button form-pass-rec__btn-back"
                    onClick={handleBackClick}
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
