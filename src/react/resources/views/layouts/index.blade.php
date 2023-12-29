<!doctype html>

<html lang="en"><head><meta charset="UTF-8">
    <head>
        <meta name="viewport" content="width=<device-width>,initial-scale=1">
        <title>Document</title>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        @stack('css')
    </head>

    <body>

    <div id="app"></div>
    <div id="root"></div>

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.js'])

    @stack('js')

    </body>
</html>