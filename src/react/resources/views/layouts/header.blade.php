<header class="header">
    <div class="header__container container">
        <div class="header__logo"><a href="/">Лого</a></div>
        <div class="header__menu">
            <ul class="menu">
                <li class="menu__item">Поиск</li>
                <li class="menu__item">Сообщения</li>
                <li class="menu__item">Блог</li>
            </ul>
        </div>
        <div class="header__user-control">
            <ul class="user-control">
                <li class="user-control__item">Премиум</li>
                <li class="user-control__item">Баланс</li>
                <li class="user-control__item"><a id="logout-link" href="/">Аккаунт</a></li>
            </ul></div></div>
</header>

<script type="text/javascript">

    document.getElementById('logout-link').addEventListener("click", (event) => {
        event.preventDefault();
        console.log('logout');
        fetch('/logout', {
            headers: {
                "Content-Type": "application/json",
                /*"X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content')*/
            }
        })
            .then(response => {
                console.log('logout response: ' + JSON.stringify(response));
                return response.json();
            })
            .then((data) => {
                console.log('logout data: ' + JSON.stringify(data));
            });
        return false;
    });

</script>

