import { useEffect, useState } from 'react';
import { fetchPasswordRecovery } from '../../fetchingAPI/authentication';
import { showErrorMessage } from '../../assets/utility';

import './ConfirmPassRecoveryMsg.scss';

let intervalId;

const stubHandler = () => {
    console.log('The stub handler has worked!');
}

function ConfirmPassRecoveryMsg({ email = 'test@test.com', onBackClick = stubHandler }) {
    const DISABLE_BUTTON_INTERVAL = 5000;
    const [disabledSubmitButton, setDisabledSubmitButton] = useState(true);
    const [ message, setMessage ] = useState(null);

    const disableSubmitButton = () => {
        setDisabledSubmitButton(true);

        intervalId = setTimeout(() => {
            setDisabledSubmitButton(false);
            clearInterval(intervalId);
        }, DISABLE_BUTTON_INTERVAL)
    };

    useEffect(() => {
        disableSubmitButton();
    }, []);

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        disableSubmitButton();
        
        const result = await fetchPasswordRecovery({ email });

        showErrorMessage(result.message, setMessage);
    }

    return (
        <div className="confirm-reg">
            <div className="confirm-reg__description">
                <p className="confirm-reg__text">Письмо с данными для восстановления пароля отправлено на адрес <span
                    className="confirm-reg__mail">{email}</span>.</p>
                <p className="confirm-reg__text">Проверьте указанный адрес электронной почты для дальнейших действий</p>
                <p className="confirm-reg__text">{message}</p>
            </div>
            <div className="confirm-reg__controls">
                <button className="confirm-reg__button form-reg__btn-back" onClick={onBackClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 -960 960 960" width="24">
                        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                    </svg>
                </button>
                <button
                    className="confirm-reg__button confirm-reg__btn-next"
                    disabled={disabledSubmitButton}
                    onClick={handleSubmit}
                >Отправить снова</button>
            </div>
        </div>
    );
}

export default ConfirmPassRecoveryMsg;
