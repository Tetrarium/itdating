import axios from "axios";
import { APPLICATION_JSON_HEADER, FORM_DATA_HEADER } from "../assets/headers";

const Status = {
    SUCCESS: 'success',
    ERROR: 'error',
};

export async function fetchUser({ userId }) {
    let result = {
        ok: false,
        user: {},
        message: '',
    }

    try {
        const response = await axios({
            method: 'get',
            url: '/users/' + userId,
            headers: APPLICATION_JSON_HEADER,
        })

        // console.log(response);
        result = {
            ...result,
            ok: true,
            user: response.data.data,
        }
    }
    catch(e) {
        console.log(e);
    }
    finally {
        return result;
    }
}

const setData = (userId, field, value) => {
    const data = {
        user_id: userId,
        field: field,
    };
    if (typeof value === "object" && value.text) {
        data.value = value.text

    } else if (typeof value == "boolean") {
        data.value = value
    }
    return data;
}

export async function fetchUpdateUser({ userId, field, value }) {
    let result = {
        ok: false,
        user: {},
        message: ''
    }

    try {
        const response = await axios({
            method: 'post',
            url: '/users/' + userId,
            headers: APPLICATION_JSON_HEADER,
            data: setData( userId, field, value ),
        });

        result = {
            ...result,
            ok: true,
            user: response.data.data,
        }
    }
    catch(e) {
        result = {
            ...result,
            message: 'Ошибка получения данных',
        }
    }
    finally {
        return result;
    }
}

export async function fetchUsers({ page }) {
    let result = {
        ok: false,
        users: [],
        links: {},
        message: '',
    }

    try {
        const response = await axios({
            method: 'get',
            url: '/users/?page=' + page,
            headers: APPLICATION_JSON_HEADER,
        })

        // console.log(response.data);
        result = {
            ...result,
            ok: true,
            users: response.data.data,
            links: response.data.links,
            meta: response.data.meta,
        }
    }
    catch (e) {
        result = {
            ...result,
            message: 'Ошибка получения данных',
        }
    }
    finally {
        return result;
    }
}

// Поработать над этими запросами
// Добавить page после принятия изменений
export async function fetchFilter({ page, filter }) {
    let result = {
        ok: false,
        users: [],
        links: {},
        message: '',
    };

    try {
        // console.log(filter);
        // console.log(page);
        const response = await axios({
            method: 'post',
            url: '/filter?page=' + page,
            headers: APPLICATION_JSON_HEADER,
            data: filter
        });

        // console.log(response);

        result = {
            ...result,
            ok: true,
            users: response.data.data,
            links: response.data.links,
            meta: response.data.meta,
        }
    }
    catch (e) {
        result = {
            ...result,
            message: 'Ошибка получения данных',
        }
    }
    finally {
        return result;
    }
}

export async function fetchMe() {
    let result = {
        ok: false,
        user: {},
        message: ''
    }

    try {
        const response = await axios({
            method: 'get',
            url: '/me',
            headers: APPLICATION_JSON_HEADER,
        });

        // console.log(response);
        result = {
            ...result,
            ok: true,
            user: response.data,
        }
    }
    catch (e) {
        result = {
            ...result,
            message: 'Ошибка получения данных',
        }
    }
    finally {
        // console.log(result);
        return result;
    }
}

export async function fetchChangeMe(data) {
    let result = {
        ok: false,
        message: '',
    }

    try {
        const response = await axios({
            method: 'post',
            url: '/users',
            headers: APPLICATION_JSON_HEADER,
            data,
        });

        result = {
            ...result,
            ok: response.data.status === Status.SUCCESS,
            message: response.data.result, 
        }
    }
    catch(e) {
        result = {
            ...result,
            message: e.message,
        }
    }
    finally {
        return result
    }
}
