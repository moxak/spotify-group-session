# Spotify Group Session

[deploy to Heroku](https://spotify-group-session-for-dt.herokuapp.com/)

## Commands 

### Initialization

```bash
npm init
```

### Launch applications
launch to dev(activate server & client)
```bash
npm start
```

launch server
```bash
npm server
```

launch client
```bash
npm client
```

### Deploy

Deploy with Heroku and using [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

0. Login and Connect application (fist-time only)

```bash
heroku login
heroku git:remote -a <HEROKU_APPLICATION_NAME>
```

1. commit and push

```bash
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

- [Endpoints | Spotify Web API](https://developer.spotify.com/documentation/web-api/reference/#/)

- [Dashboard | Spotify for Developers](https://developer.spotify.com/dashboard/applications/)

- [Development guides | Spotify for Developers](https://developer.spotify.com/documentation/general/guides/)

- [Documentaion | styled components](https://styled-components.com/docs)

- [API reference | React](https://reactjs.org/docs/react-api.html)