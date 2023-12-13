import { useEffect, useState } from 'react';

import './Athentication.scss';

import Quiz from '../Quiz/Quiz';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import ConfirmRegistrationMsg from '../ConfirmRegistrationMsg/ConfirmRegistrationMsg';
import LogInForm from '../LogInForm/LogInForm';
import PasswordRecoveryForm from '../PasswordRecoveryForm/PasswordRecoveryForm';
import ConfirmPassRecoveryMsg from '../ConfirmPassRecoveryMsg/ConfirmPassRecoveryMsg';
import PasswordChangeForm from '../PasswordChangeForm/PasswordChangeForm';
import axios from 'axios';

/**
 * Разобратся с лишним ререндерингом квиза.
 */

// Типы виджетов аутентификации
const WidgetTypes = {
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

    const [ widgetType, setWidgetType ] = useState(startWidget);
    const [ tags, setTags ] = useState([]);
    const [ email, setEmail ] = useState('');
    const [ registrationData, setRegistrationData ] = useState({
        name: '',
        email: '',
    });

    const [questionHistory, setQuestionHistory] = useState([]);

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

    // Временный для отладки
    useEffect(() => {
        console.log(tags);
    }, [tags])

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

    // Временный для отладки
    // useEffect(() => {
    //     console.log(mail);
    // }, [mail]);

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
                return <PasswordChangeForm />

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
                {/* <ConfirmRegistrationMsg /> */}
                {/* <PasswordRecoveryForm /> */}
                {/* <PasswordChangeForm /> */}
                {renderWidget()}
            </div>
        </div>
    );
}

export default Athentication;