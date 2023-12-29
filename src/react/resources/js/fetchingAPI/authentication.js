import axios from "axios";
import { APPLICATION_JSON_HEADER, FORM_DATA_HEADER } from "../assets/headers";

const Status = {
    SUCCESS: 'success',
    ERROR: 'error',
};

export async function fetchLoginState() {
    try {
        const response = await axios({
            method: 'get',
            url: '/check',
            headers: APPLICATION_JSON_HEADER,
        })

        if (response.data.result) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function fetchLogout() {
    try {
        const response = await axios({
            method: 'get',
            url: '/logout',
            headers: APPLICATION_JSON_HEADER,
        });

        const { data } = response;
        return data.status === Status.SUCCESS;
    } catch(e) {
        console.log(e);
        return false;
    }
} 

export async function fetchLogin(data) {
    let result = {
        ok: false,
        message: '',
    }
    try {
        const response = await axios({
            method: 'post',
            url: '/login',
            data,
            headers: FORM_DATA_HEADER,
        })

        result = {
            ...result,
            ok: response.data.status === Status.SUCCESS,
        }
    }
    catch (e) {
        console.log(e);
        result = {
            ...result,
            message: e.response.data.result.email[0],
        }
    }
    finally {
        return result;
    }
}

export async function fetchPasswordRecovery(sendingData) {
    let result = {
        ok: false,
        message: ''
    }

    try {
        const { data } = await axios({
            method: 'post',
            url: `/forgot-password`,
            data: sendingData,
            headers: APPLICATION_JSON_HEADER,
        })

        switch (data.result) {
            case 'passwords.user':
                result = {
                    ...result,
                    message: 'Пользователь с данным email не найден',
                };
                break;
            case 'passwords.token':
                result = {
                    ...result,
                    message: 'Токен неверен',
                };
                break;
            case 'passwords.throttled':
                result = {
                    ...result,
                    message: '"Спам" запросами',
                };
                break;
            
            case 'passwords.sent':
                result = {
                    ...result,
                    ok: true,
                    message: 'Успешно отправленное уведомление на email',
                };
                break;
            case 'passwords.reset':
                result = {
                    ...result,
                    ok: true,
                    message: 'Пароль успешно сброшен',
                };
                break;
            
            default: {
                result = {
                    ...result,
                    message: 'Неизвестная ошибка',
                }
            }
        }
    }
    catch(e) {
        result = {
            ...result,
            message: e.message,
        }
    }
    finally {
        return result;
    }
}

export async function fetchChangePassword(sendingData) {
    let result = {
        ok: false,
        message: '',
    }

    try {
        const response = await axios({
            method: 'post',
            url: '/reset-password',
            data: sendingData,
            headers: FORM_DATA_HEADER,
        })

        const { data } = response;

        if ( data.status === Status.ERROR ) {
            result = {
                ...result,
                message: data.result.password[0],
            }
        }

        if ( data.status === Status.SUCCESS ) {
            result = {
                ...result,
                ok: true,
                message: 'Пароль изменен. Перенаправляю на главную',
            }
        }
    }
    catch(e) {
        console.log(e);
    }
    finally {
        return result;
    }
}

export async function fetchQuizQuestions(questionHistory, controller) {
    const abortContriller = new AbortController()

    let result = {
        ok: false,
        questions: {
            first: null,
            seconsd: null,
        },
        message: '',
    }

    try {
        const response = await axios({
            method: 'post',
            url: '/quiz',
            headers: APPLICATION_JSON_HEADER,
            data: {
                history: questionHistory,
            },
            signal: abortContriller.signal,
        });

        const { data } = response;

        if (data.status === Status.SUCCESS) {
            result = {
                ...result,
                ok: true,
                questions: {
                    first: data.first,
                    second: data.second,
                }
            }
        }
    }
    catch(e) {
        console.log(e);
        result = {
            ...result,
            ok: false,
            message: e.message,
        }
    }
    finally {
        abortContriller.abort();
        return result;
    }
}
