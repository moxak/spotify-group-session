# Spotify Group Session

It is an utility application for Spotify function "Group Session" while using desktop client.

Also it is Implemented some functions to vizualize Audio Features. ([Read more](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-several-audio-features))

[Deploied to Heroku](https://spotify-group-session-for-dt.herokuapp.com/)

## Local Installation & Set Up

1. Register a Spotify App in your [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) and add `http://localhost:8888/callback` as a Redirect URI in the app settings

2. Create a `.env` file at the project based on `.env.example` and add your unique
`CLIENT_ID` and `CLIET_SECRET` from the Spotify dashboard

3. Ensure [nvm](https://github.com/nvm-sh/nvm) and [npm](https://www.npmjs.com/) are installed globally.

4. Install the correct version of Node

    ```shell
    nvm install
    ```

5. Install dependencies
    
    ```shell
    npm install 
    ```

6. Run the React app on <http://localhost:3000> and the Node server on <http://localhost:8888>

    ```shell
    npm start
    ```


## Deploying to Heroku with Git

1. Create a [Heroku](https://www.heroku.com/) app

2. Add your Heroku app as a git remote

    ```shell
    heroku git remote -a your-app-name
    ```

3. Add `https://your-app-name.herokuapp.com/callback` as a Redirect URI in your Spotify app's settings

4. In your app's Settings tab in the Heroku dashboard, add [config vars](https://devcenter.heroku.com/articles/config-vars#using-the-heroku-dashboard)


    Based on the values in your `.env` file, the `CLIENT_ID`, `CLIENT_SECRET`, `REDIRECT_URI`, and `FRONTEND_URI` key value pairs. Make sure to replace the `localhost` URLs with your heroku app's URL.

5. Push to Heroku

    ```shell
    git push heroku master
    ```

## Commands 

### Initialization

```shell
npm init
```

### Launch applications
launch to dev(activate server & client)
```shell
npm start
```

launch server
```shell
npm server
```

launch client
```shell
npm client
```

### Deploy

Deploy with Heroku and using [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

0. Login and Connect application (fist-time only)

    ```shell
    heroku login
    heroku git:remote -a <HEROKU_APPLICATION_NAME>
    ```

1. commit and push

    ```shell
    git commit -m "deploy" --allow-empty
    git push heroku master
    ```

2. finish to deploy

### Install packages

install a package for an authenication server
```bash
npm i <PACKAGE_NAME>
```

install a package for React client
```bash
cd client
npm i <PACKAGE_NAME>
```

## Documents

### Spotify API

- [Endpoints | Spotify Web API](https://developer.spotify.com/documentation/web-api/reference/#/)

- [Dashboard | Spotify for Developers](https://developer.spotify.com/dashboard/applications/)

- [Development guides | Spotify for Developers](https://developer.spotify.com/documentation/general/guides/)

### React

- [Documentaion | styled components](https://styled-components.com/docs)

- [API reference | React](https://reactjs.org/docs/react-api.html)

### Web Application

- [heroku](https://dashboard.heroku.com/apps)

- [favicon.io](https://favicon.io/)

- [cards-dev.twitter](https://cards-dev.twitter.com/validator)