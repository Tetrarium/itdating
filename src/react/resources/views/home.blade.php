@extends('layouts/index')

@Push('css')

@endpush

@section('content')

<div class="filters">
    This is filters
</div>

<main class="home-main">
    <div class="messenger">
        This is the messenger
    </div>

    <div class="profile-container">
        <div class="row">
            <div class="logo">

            </div>
            <div class="name-info">
                <div class="name">Admin, 33</div>
                <div class="status">Мое настроение сегодня</div>
            </div>


        </div>
    </div>
</main>

@stop

@Push('js')
<script type="text/javascript">


    document.addEventListener("DOMContentLoaded", function() {
        console.log('home');
        //testResendEmail();

    });

</script>
@endpush
