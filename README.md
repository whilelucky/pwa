# Progressive Web App
> An opinionated progressive web app boilerplate, to hit the ground running.

## Setup
```
$ npm install
```

## ENV Variables
- NODE_ENV (build-dependent)
  - development: modules are bundled as is
  - production: modules are minified and uglified

- PWA_ENV (build-dependent)
  - development: configs are obtained from /config/development.js
  - production: configs are obtained from /config/production.js
  - customConfig: configs are obtained from /config/customConfig.js

- PWA_PUBLIC_PATH (build-dependent)
  - /build/client/: assets are fetched from the local filesystem
  - //production.cdn.com/build/client/: assets are fetched from this cdn path
  - /custom/path/: assets are fetched from /custom/path/

- PWA_SSR (build-independent)
  - true: enable server side data fetching and rendering
  - false: disable server side data fetching and rendering

- PORT (build-independent)
  - 8000: serve the app at port 8000
  - 1337: serve the app at port 1337

*build-dependent: if any of these variables values have to be changed, assuming you change `PWA_PUBLIC_PATH=//other.cdn.com` in the `staging:build` script, then it requires a rebuild and a restart, `npm run staging`*

*build-independent: if any of these variable values have to be changed, assuming you change `PWA_SSR=false` in the `staging:start` script, then it only requires a restart, `npm run staging:start`*

## Usage
There are some useful npm scripts setup for you to start using these ENV variables effectively, please look at [package.json](./package.json) to better understand how they're setup for each script.

>Remember to run `npm stop` to stop all the pwa pm2 instances before using a different script from below.

Start as local development server with file watching:
```bash
$ npm start
# runs at http://localhost:8000
# npm run stop is automatically called for you after
# hitting ctrl+c to quit the webpack-dev-server
```

Start as local production server:
```bash
$ npm run development
# runs at http://localhost:1337
```

Start as staging server:
```bash
$ npm run staging
# runs at http://localhost:1337
```

Start as production server:
```bash
$ npm run production
# runs at http://localhost:1337
```

Using pm2:
```bash
$ npm run pm2 -- logs # follow all server logs
$ npm run pm2 -- list # list all processes
$ npm run pm2 -- kill # kill pm2 parent process
$ npm run pm2 -- help # show other available commands
```

## License
[MIT](./LICENSE)
