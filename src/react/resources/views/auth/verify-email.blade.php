@extends('layouts/index-static')

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
                    <div class="" id="register-confirm" style="">
                        <p>Для подтверждения регистрации мы отправили вам письмо по адресу test@mail.com.</p>
                        <p>Проверьте указанный адрес электронной почты для подтверждения данных аккаунта</p>
                    </div>

                </div>

            </div>

        </div>
    </div>
</main>
@endsection

<script type="text/javascript">
    /* Get first element by class name helper */

    function getFirstElementByClassName(className) {
        const elementsArray = Array.from(document.getElementsByClassName(className));
        if (elementsArray.length > 0) {
            return elementsArray[0];
        }
        return false;
    }

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

    const registerConfirm = document.getElementById('register-confirm');



    document.addEventListener("DOMContentLoaded", function() {
        console.log('hello');
        console.log(registerConfirm);
            fetch('/email/verify/67/hash?expires=1702006965&hash=1f0ffa087fe9a2c3909dd41b117aa410acdf0fd0&signature=c5562ec867d8762f946a775ca7bb9dbaabbd577367a9e297cc08c67ba1c3be01', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            }).then((response) => {
                console.log(JSON.stringify(response.json()))
                return response.json();
            });

    });
</script>

</html>
