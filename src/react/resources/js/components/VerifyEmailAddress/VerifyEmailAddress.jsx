import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

/**
 * Компонент верификации адреса электронной почты
 * При рендеренге компонента на сервер отправляется запрос
 * верификации почты.
 * При успешной верификации происходит редирект на главную
 * страницу
 * @returns 
 */

function VerifyEmailAddress() {
    const { id } = useParams();
    const navigate = useNavigate();

    // В данный момент не используется хэш. Понять назначение
    // const [searchParams] = useSearchParams();
    // const objSearchParams = Object.fromEntries(searchParams);
    // console.log(objSearchParams);

    const [ message, setMessage ] = useState('Email верифицируется')

    useEffect(() => {
        console.log(window.location.href);
        axios({
            method: 'post',
            url: window.location.href,
            headers: {
                "Content-Type": "application/json",
                // Разобраться с токеном
                "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            }
        })
            .then((response) => {
                console.log('Маил зарегистрирован');
                console.log(response);
                setMessage('Емэйл успешно верифицирован, сейчас откроется главная страница');

                setTimeout(() => {
                    navigate('/homepage', {
                        state: {
                            isEmailVerified: true,
                            message: 'Емэйл успешно верифицирован',
                        }
                    });
                }, 2000);
            })
            .catch((err) => {
                setMessage('Ошибка верификации мэйла');
                console.log('Ошибка регистрации майла');
                console.log(err);
            })
    }, [])

    return (
        <div style={{ margin: '10px', fontSize: '20px' }}>
            {message}
        </div>
    );
}

export default VerifyEmailAddress;
