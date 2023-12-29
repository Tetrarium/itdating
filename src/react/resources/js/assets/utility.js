export function objectToFormData(object) {
    const formData = new FormData();

    for (let key in object) {
        formData.append(key, object[key]);
    }

    return formData;
}

let timerId = null;

export function showErrorMessage(msg, callback) {
    if (timerId) {
        clearTimeout(timerId);
        timerId = null;
        callback(null);
    }
    callback(msg);

    setTimeout(() => {
        callback(null);
        clearTimeout(timerId);
        timerId = null;
    }, 2000);
}

export function convertGenderRuToEn (gender) {
    switch (gender) {
        case 'мужчина':
            return 'man';
        case 'женщина':
            return 'woman';
        default:
            return null;
    }
}

export function getBodyPrefs (user) {
    const { prefs, info } = user;
    if (!user.info || !user.prefs) {
        return null;
    }
    const prefSuff = '_body_type';
    const genderRu = info.gender;
    // const genderRu = 'женщина';
    // const genderRu = '';

    const genderEn = convertGenderRuToEn(genderRu);

    if (genderEn) {
        return prefs[genderEn + prefSuff]
    }

    return Array.from( new Set([ ...prefs.man_body_type, ...prefs.woman_body_type ]));
}

/**
 * Обертывает принимаемую функцию в декоратор, 
 * отсрочивающий вызов принимаемой функции
 * на заданное время
 * Каждый последующий вызов полученной функции
 * обнуляет таймер
 * 
 * @param {декорируемая функция} func 
 * @param {задержка, мс} ms 
 * @returns исходная функция, обернутая в отсрочивающий декоратор 
 */
export function debounce(func, ms) {
    let timeout;
    return function() {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            func.apply(this, arguments);
            clearTimeout(timeout);
        }, ms);
    }
}
