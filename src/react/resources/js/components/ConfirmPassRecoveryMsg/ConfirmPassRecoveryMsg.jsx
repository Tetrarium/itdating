import { useEffect, useState } from 'react';
import './ConfirmPassRecoveryMsg.scss';
import { FORM_DATA_HEADER } from '../../assets/headers';
import axios from 'axios';

let intervalId;

const stubHandler = () => {
    console.log('The stub handler has worked!');
}

function ConfirmPassRecoveryMsg({ email = 'test@test.com', onBackClick = stubHandler }) {
    const DISABLE_BUTTON_INTERVAL = 5000;
    const [disabledSubmitButton, setDisabledSubmitButton] = useState(true);

    const disableSubmitButton = () => {
        setDisabledSubmitButton(true);

        intervalId = setTimeout(() => {
            setDisabledSubmitButton(false);
            clearInterval(intervalId);
        }, DISABLE_BUTTON_INTERVAL)
    };

    const fetchMailConfirm = () => {
        axios({
            method: 'post',
            url: `/forgot-password`,
            data: { email },
            headers: FORM_DATA_HEADER,
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        disableSubmitButton();
    }, []);

    const sendHandler = (evt) => {
        evt.preventDefault();

        disableSubmitButton();
        fetchMailConfirm();
    }

    return (
        <div className="confirm-reg">
            <div className="confirm-reg__description">
                <p className="confirm-reg__text">Письмо с данными для восстановления пароля отправлено на адрес <span
                    className="confirm-reg__mail">{email}</span>.</p>
                <p className="confirm-reg__text">Проверьте указанный адрес электронной почты для дальнейших действий</p>
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
                    onClick={sendHandler}
                >Отправить снова</button>
            </div>
        </div>
    );
}

export default ConfirmPassRecoveryMsg;
