<!doctype html>

<html lang="en"><head><meta charset="UTF-8">
    <head>
        <meta name="viewport" content="width=<device-width>,initial-scale=1">
        <title>Document</title>
        <link rel="stylesheet" href="{{ asset('css/main.css')}}?ver={{ filemtime(public_path('css/main.css')) }}">
        <script defer="defer" src="{{ asset('js/main.js')}}"></script>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        @stack('css')
    </head>

<body>


@include('../layouts/header')

@viteReactRefresh
@vite(['resources/css/app.css', 'resources/js/app.js'])
<!-- <div id="example"></div> -->

@yield('content')

@include('../layouts/footer')

@stack('js')

</body>
</html>
