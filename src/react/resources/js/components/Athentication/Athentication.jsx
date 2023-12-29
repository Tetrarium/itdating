import { useEffect, useState } from 'react';

import './Athentication.scss';

import Quiz from '../Quiz/Quiz';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import ConfirmRegistrationMsg from '../ConfirmRegistrationMsg/ConfirmRegistrationMsg';
import LogInForm from '../LogInForm/LogInForm';
import PasswordRecoveryForm from '../PasswordRecoveryForm/PasswordRecoveryForm';
import ConfirmPassRecoveryMsg from '../ConfirmPassRecoveryMsg/ConfirmPassRecoveryMsg';
import PasswordChangeForm from '../PasswordChangeForm/PasswordChangeForm';
import { useLocation } from 'react-router-dom';

/**
 * Разобратся с лишним ререндерингом квиза.
 */

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

// Привязка виджетов к типам аутентификации
const AuthTypes = {
    REGISTER: [WidgetTypes.QUIZ, WidgetTypes.REGISTER, WidgetTypes.CONFIRM_REGISTER],
    LOGIN: [WidgetTypes.LOGIN, WidgetTypes.PASSWORD_RECOVERY, WidgetTypes.PASSWORD_RECOVERY_CONFIRM, WidgetTypes.PASSWORD_CHANGE],
}

const Status = {
    SUCCESS: 'success',
    ERROR: 'error',
};

function Athentication(props) {
    const startWidget = WidgetTypes.QUIZ;

    const [widgetType, setWidgetType] = useState(startWidget);
    const [tags, setTags] = useState([]);
    const [email, setEmail] = useState('');
    const [registrationData, setRegistrationData] = useState({
        name: '',
        email: '',
    });
    const [changePasswordState, setChangePasswordState] = useState({
        email: '',
        token: '',
    })

    const [questionHistory, setQuestionHistory] = useState([]);

    const locationApp = useLocation();

    useEffect(() => {
        if (locationApp.state && locationApp.state.widgetType)  {
            setChangePasswordState({
                email: locationApp.state.email,
                token: locationApp.state.token,
            })
            setWidgetType(locationApp.state.widgetType)
        }
    }, [locationApp.state]);

    const setRegisterForm = (evt) => {
        evt.preventDefault();
        if (tags.length >= 5) {
            setWidgetType(WidgetTypes.REGISTER);
        } else {
            setWidgetType(WidgetTypes.QUIZ);
        }
    }

    const openLoginForm = () => {
        setWidgetType(WidgetTypes.LOGIN);
    }

    const setLogInForm = (evt) => {
        evt.preventDefault();
        openLoginForm();
    }

    const getButtonClassName = (assignedType) => {
        const basic = 'authentication__option';
        const modificator = '_selected';

        if (assignedType.includes(widgetType)) {
            return basic + ' ' + basic + modificator
        }

        return basic;
    }

    const completeQuiz = (history) => {
        setTags(history);
        setWidgetType(WidgetTypes.REGISTER);
    }

    const backRegistrationHandler = (evt) => {
        evt.preventDefault();

        // Вариант начала квиза
        setTags([]);
        // Вариант конца квиза
        // setTags(tags.slice(0, tags.length - 1));
        setWidgetType(WidgetTypes.QUIZ);
    }

    const endRegistrationHandler = (data) => {
        // setMail(mail);
        setRegistrationData({
            name: data.name || '',
            email: data.email || '',
        })
        setWidgetType(WidgetTypes.CONFIRM_REGISTER);
    }

    const backToRegistrationForm = (evt) => {
        evt.preventDefault();

        setWidgetType(WidgetTypes.REGISTER);
    }

    const openPassRecoveryForm = () => {
        setWidgetType(WidgetTypes.PASSWORD_RECOVERY);
    };

    const openConfirmRecoveryPassMsg = () => {
        setWidgetType(WidgetTypes.PASSWORD_RECOVERY_CONFIRM);
    };

    const submitRecoveryPassHandler = (data) => {
        setEmail(data.email);
        openConfirmRecoveryPassMsg();
    }

    const openPasswordChangeForm = (data) => {
        setChangePasswordState(data);
        setWidgetType(WidgetTypes.PASSWORD_CHANGE);
    }

    // useEffect(() => {
    //     console.log(changePasswordState);
    // }, [changePasswordState]);

    const renderWidget = () => {
        switch (widgetType) {
            // register widgets
            case WidgetTypes.QUIZ:
                return <Quiz
                    numQuestions={5}
                    endQuizHandle={completeQuiz}
                    tags={tags}
                />;
            case WidgetTypes.REGISTER:
                return <RegistrationForm
                    tags={tags}
                    data={registrationData}
                    onBackClick={backRegistrationHandler}
                    onEndRegistration={endRegistrationHandler}
                />
            case WidgetTypes.CONFIRM_REGISTER:
                return <ConfirmRegistrationMsg
                    mail={registrationData.email}
                    onBackClick={backToRegistrationForm} />;

            // login widgets
            case WidgetTypes.LOGIN:
                return <LogInForm
                    setIsLogIn={props.setIsLogIn}
                    onForgotPass={openPassRecoveryForm} />;
            case WidgetTypes.PASSWORD_RECOVERY:
                return <PasswordRecoveryForm
                    email={email}
                    onBackClick={openLoginForm}
                    onSubmitForm={submitRecoveryPassHandler} />;
            case WidgetTypes.PASSWORD_RECOVERY_CONFIRM:
                return <ConfirmPassRecoveryMsg
                    email={email}
                    onBackClick={openPassRecoveryForm} />
            case WidgetTypes.PASSWORD_CHANGE:
                return <PasswordChangeForm params={changePasswordState} />

            default:
                return null;
        }
    }

    return (
        <div className="authentication">
            <div className="authentication__options">
                <button
                    className={getButtonClassName(AuthTypes.REGISTER)}
                    onClick={setRegisterForm}
                >Регистрация</button>
                <button
                    className={getButtonClassName(AuthTypes.LOGIN)}
                    onClick={setLogInForm}
                >Вход</button>
            </div>
            <div className="authentication__widget">
                {renderWidget()}
            </div>
        </div>
    );
}

export default Athentication;