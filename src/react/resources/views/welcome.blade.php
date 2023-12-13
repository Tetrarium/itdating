@extends('layouts/index')

@Push('css')

@endpush

@section('content')


<main class="main">
    <div class="container">
        This is main
        <div class="row main-row">

            <div class="register-control">
                <div class="row">
                    <div class="col-half register-control__col" onclick="register();">
                        Регистрация
                    </div>
                    <div class="col-half register-control__col" onclick="login();">
                        Вход
                    </div>
                </div>

                <div class="row form-row">
                    <div class="quiz-wrapper" id="quiz-wrapper">
                        <p>Перед регистрацией ответьте на несколько вопросов:</p>
                        <div class="quiz-wrapper__answers">
                            <div class="quiz-wrapper__answers__element" id="answer_first">

                            </div>
                            <p>или</p>
                            <div class="quiz-wrapper__answers__element" id="answer_second">

                            </div>
                        </div>
                        <div class="quiz-wrapper__bottom">
                            <a class="quiz-wrapper__bottom__back_button" id="quiz_back">
                                <-
                            </a>
                            <p>Это поможет нам точнее подобрать вам подходящего партнера</p>
                        </div>
                    </div>
                    <form action="/register" method="POST" id="register-form" style="display:none">
                        @csrf <!-- {{ csrf_field() }} -->
                        <label for="user_name">Имя:</label><br>
                        <input type="text" id="name" name="name" value=""><br>
                        <label for="user_email">Email:</label><br>
                        <input type="text" id="email" name="email" value=""><br>
                        <label for="user_nickname">Ник:</label><br>
                        <input type="text" id="nickname" name="nickname" value=""><br>
                        <label for="user_passwd">Пароль:</label><br>
                        <input type="text" id="password" name="password" value=""><br>
                        <br>
                        <input type="submit" value="Submit">
                    </form>
                    <form action="/login" method="POST" id="login-form" style="display: none">
                        @csrf <!-- {{ csrf_field() }} -->
                        <label for="user_email">Email:</label><br>
                        <input type="text" id="email" name="email" value=""><br>
                        <label for="user_passwd">Пароль:</label><br>
                        <input type="text" id="password" name="password" value=""><br>
                        <br>
                        <input type="submit" value="Submit">
                    </form>
                    <div class="" id="register-confirm" style="display: none">
                        <p>Для подтверждения регистрации мы отправили вам письмо по адресу test@mail.com.</p>
                        <p>Проверьте указанный адрес электронной почты для подтверждения данных аккаунта</p>
                    </div>

                </div>

            </div>

        </div>
    </div>
</main>
@stop


@Push('js')
<script type="text/javascript">

    /**
     *  Get first element by class name helper
     **/

    function getFirstElementByClassName(className) {
        const elementsArray = Array.from(document.getElementsByClassName(className));
        if (elementsArray.length > 0) {
            return elementsArray[0];
        }
        return false;
    }

    /**
     * Process form with custom submit handler
     **/

    function preventFormSubmit(form, func) {
         if (form.addEventListener) {
             form.addEventListener("submit", function(evt) {
                evt.preventDefault();
                /*window.history.back();*/
                func(evt);
            }, true);
        }
        else {
            form.attachEvent('onsubmit', function(evt){
                evt.preventDefault();
                /*window.history.back();*/
                func(evt);
            });
        }
    }

    /**
     *  Appending array to form data helper
     **/

    function appendArrayToFormData(formData, arr, name) {
        for (let i = 0; i < arr.length; i++) {
            formData.append(name + '[]', arr[i]);
        }
        return formData;
    }


    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const quizWrapper = document.getElementById('quiz-wrapper');

    let isLoginTab = false;

    /**
     * Shows register tab
     */
    function register() {
        isLoginTab = false;
        console.log('register ' + isLoginTab);
        loginForm.style.display = 'none';
        checkAuth();
    }

    /**
     * Shows login tab
     */

    function login() {
        isLoginTab = true;
        console.log('login ' + isLoginTab);
        registerForm.style.display = 'none';
        quizWrapper.style.display = 'none';
        loginForm.style.display = 'block';
    }

    let number = 1;
    let questionsHistory = [];
    let answers = [];

    /**
     * Fetch pair of quiz questions
     */

    function fetchQuizQuestions() {
        fetch('/quiz', {
            method: 'POST',
            body: JSON.stringify({
                "history": questionsHistory
            }),
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            if (data.exception == null) {
                let first = data.first;
                let second = data.second;
               /* let question = {
                    first: first,
                    second: second
                };*/
                questionsHistory.push(first);
                questionsHistory.push(second);
                console.log(questionsHistory);
                document.getElementById('answer_first').textContent = first;
                document.getElementById('answer_second').textContent = second;
            }
            else {
            }
        });
    }

    /**
     * Shows register form after quiz is passed
     */

    function showRegisterFormAfterQuiz() {
        console.log(answers);
        quizWrapper.style.display = 'none';
        registerForm.style.display = 'block';
    }

    function quiz() {
        if (questionsHistory.length === 0) {
            document.getElementById('quiz_back').style.display = 'none';
        }
        else {
            document.getElementById('quiz_back').style.display = 'flex';
        }

        if (answers.length >= 5) {
            showRegisterFormAfterQuiz();
        }
        else {
            fetchQuizQuestions();
        }

    }

    /**
     *  1 вариант
     **/

    function answerFirstClicked(event) {
        answers.push(event.target.textContent.replace(/(\r\n|\n|\r)/gm, ""));
        console.log(answers);
        quiz();
    }

    /**
     *  2 вариант
     **/

    function answerSecondClicked(event) {
        answers.push(event.target.textContent.replace(/(\r\n|\n|\r)/gm, ""));
        console.log(answers);
        quiz();
    }


    /**
     *  Проверка авторизации
     **/

    function checkAuth() {
        fetch('/check', {
                method: 'GET',

            })
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                isAuth = data.result;
                console.log('isAuth: ' + isAuth);
                if (!isLoginTab && registerForm !== null && quizWrapper !== null) {
                     if (!isAuth) {
                         registerForm.style.display = 'none';
                         quiz();
                         document.getElementById('answer_first').addEventListener('click', (event) => answerFirstClicked(event));
                         document.getElementById('answer_second').addEventListener('click', (event) => answerSecondClicked(event));
                         quizWrapper.style.display = 'block';

                    }
                    else {
                        quizWrapper.style.display = 'none';
                        registerForm.style.display = 'block';
                    }
                }
            });
    }

    function testResendEmail(formData) {
        fetch('/email/verify-resend', {
            method: 'POST',
            body: formData
        }).then(response => response.json()
            ).then((data) => {
            console.log('/verification-notification resp.json(): ' + JSON.stringify(data));
            if (data.status === 'success') {
                console.log('resend success');
            }
            else {
                console.log('resend fail');
            }
        });
    }

    function fetchRegister(formData) {
        fetch('/register', {
            method: 'POST',
            body: formData
        }).then((response) => {
            response = response.json();
            if (response.status === 'success') {
                window.location.href = '/';
            }
            else {
            }
        });
    }



    document.addEventListener("DOMContentLoaded", function() {
        console.log('hello');
        checkAuth();
        /*
        console.log(registerForm);
        preventFormSubmit(registerForm, (event) => {
            let formData = new FormData(event.target);
            appendArrayToFormData(formData, answers, 'quiz');
            if (isAuth) {
                console.log('auth true, resend');
                testResendEmail(formData);
            }
            else {
                fetchRegister(formData);
            }
        });

        preventFormSubmit(loginForm, (event) => {

            let formData = new FormData(event.target);
            fetch('/login', {
                method: 'POST',
                body: formData
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('login response data: ' + JSON.stringify(data));
                if (data.exception == null && data.status !== undefined && data.status !== 'error') {
                    // Успешный вход в приложение
                   // window.location.href = '/';
                }
                else {
                    // Обработка ошибки входа в приложение
                }
            });
        });

         */



    });
</script>
@endpush


</html>