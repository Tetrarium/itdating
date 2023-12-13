<!doctype html>

<html lang="en"><head><meta charset="UTF-8">
    <head>
        <meta name="viewport" content="width=<device-width>,initial-scale=1">
        <title>Document</title>
        <meta name="csrf-token" content="{{ csrf_token() }}">
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