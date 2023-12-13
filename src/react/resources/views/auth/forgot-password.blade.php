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
                    <form action="/login" method="POST" id="login-form" style="">
                        <p>Для восстановления доступа к аккаунту, введите email, указанный вами при регистрации</p>
                        <br>
                        @csrf <!-- {{ csrf_field() }} -->
                        <label for="user_email">Email:</label><br>
                        <input type="text" id="email" name="email" value=""><br>
                        <br>
                        <input type="submit" value="Submit">
                    </form>

                </div>

            </div>

        </div>
    </div>
</main>

@endsection



<script type="text/javascript">
    /* Get first element by class name helper */


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



    document.addEventListener("DOMContentLoaded", function() {
        const loginForm = document.getElementById('login-form');
        console.log('hello');
        console.log(loginForm);
        preventFormSubmit(loginForm, (event) => {
            let formData = new FormData(event.target);
            fetch('/forgot-password', {
                method: 'POST',
                body: formData
            }).then((response) => {
                console.log(response)
            })
        });

    });
</script>

</html>

