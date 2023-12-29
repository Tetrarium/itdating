// Типы виджетов аутентификации
export const WidgetTypes = {
    QUIZ: 'QUIZ',
    REGISTER: 'REGISTER',
    CONFIRM_REGISTER: 'CONFIRM_REGISTER',

    LOGIN: 'LOGIN',
    PASSWORD_RECOVERY: 'PASSWORD_RECOVERY',
    PASSWORD_RECOVERY_CONFIRM: 'PASSWORD_RECOVERY_CONFIRM',
    PASSWORD_CHANGE: 'PASSWORD_CHANGE',

};

const defaultState = WidgetTypes.QUIZ;

const changeAuthWidgetReducer = (state = defaultState) => {
    return state;
}

export default changeAuthWidgetReducer;