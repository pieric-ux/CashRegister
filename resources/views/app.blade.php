<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="apple-mobile-web-app-capable" content="yes">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Favicon -->
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" nonce="{{ Vite::cspNonce() }}">
        <link rel="icon" type="image/x-icon" sizes="any" href="/favicon.ico" nonce="{{ Vite::cspNonce() }}">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" nonce="{{ Vite::cspNonce() }}">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" nonce="{{ Vite::cspNonce() }}">
        <link rel="manifest" href="/manifest.webmanifest" nonce="{{ Vite::cspNonce() }}">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net" nonce="{{ Vite::cspNonce() }}" >
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" nonce="{{ Vite::cspNonce() }}" />

        <!-- Scripts -->
        @routes(nonce: Vite::cspNonce())
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased min-h-dvh">
        @inertia
    </body>
</html>
