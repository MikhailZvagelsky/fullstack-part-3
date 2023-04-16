# Backend of the 'Phonebook' application

## Project structure

The `frontend-build` folder contains the application frontend build,
copied from the `../fullstack-part-3-frontend/build`.

Build frontend and copy:

```
npm run build:ui
```

Build frontend and deploy to Fly.io:

```
npm run deploy:full
```

## Node version

This project uses node version 18.15.0.
```
nvm use 18.15.0
```

## Build frontend

The frontend project folder is `../fullstack-part-3-frontend`.

## Deploy to Fly.io

```
// login
fly auth login

// initialize fly application - create build/deployment script and Dokerfile
fly launch

// deploy to the cloud
fly deploy

// open the app
fly open

fly logs

// check connection with Fly.io
flyctl ping -o personal
```

# App url

Admin URL: https://fly.io/apps/phonebook-april-2023

Hostname: phonebook-april-2023.fly.dev
