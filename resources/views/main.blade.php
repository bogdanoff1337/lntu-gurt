<!doctype html>
<html lang="en">
  <head>
   <meta charset="UTF-8" />
   <link rel="icon" type="image/svg+xml" href="/vite.svg" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <title>App</title>
   {{ Vite::useBuildDirectory('/main') }}
   @viteReactRefresh
   @vite('src/main.tsx')
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
