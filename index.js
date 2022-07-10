require('dotenv').config();
const express = require('express');
const axios = require('axios');
const {randomBytes} = require('crypto');
const querystring = require('querystring');
const app = express();
const path = require('path');

function generateRandomString(length) {
    return randomBytes(length).reduce((p, i) => p + (i % 36).toString(36), '')
}

function escapeRegExp(re, string) {
    return string.replace(re, '\\$&');
}

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const FRONTEND_URI = process.env.FRONTEND_URI;
const PORT = process.env.PORT || 8888;

// Priority server any static files
app.use(express.static(path.resolve(__dirname, './client/build')));

const statekey = "spotify_auth_state";

app.get("/login", (req, res) => {
    const state = generateRandomString(16);
    res.cookie(statekey, state);

    let scope = [
        'user-read-private', // https://api.spotify.com/v1/me
        'user-read-email', // https://api.spotify.com/v1/me
        'playlist-read-private', // https://api.spotify.com/v1/me/playlists
        'user-top-read', // https://api.spotify.com/v1/me/top/{type}
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-follow-modify',
        'user-follow-read',
        'user-library-modify',
        'user-library-read',
        'streaming',
        'user-read-playback-position',
        'playlist-modify-private',
        'app-remote-control',
        'playlist-modify-public',
        'user-read-currently-playing',
        'user-read-recently-played'
    ].join(' ');

    const queryParams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope,
    });

    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

app.get('/callback', (req, res)=> {
    const code = req.query.code || null;

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI,
        }),
        headers: {
            'content_type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        }
    }).then(response => {
        if (response.status === 200) { 

            const { access_token, refresh_token, expires_in } = response.data;
            

            const queryParams = querystring.stringify({
                access_token,
                refresh_token,
                expires_in
            });

            // redriect to rect app
            // pass along tokens & refresh token in query params
            res.redirect(`${FRONTEND_URI}/?${queryParams}`);        

        } else {
            res.redirect(`/?${querystring.stringify({ error: 'invalid_token' })}`);
        }
    }).catch(error => {
        res.send(error);
    });
});

app.get("/refresh_token", (req, res)=> {
    const { refresh_token } = req.query;
    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
        }),
        headers: {
            'content_type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        }
    }).then(response => {
        if (response.status === 200) { 
            res.send(response.data);
        } else {
            res.send(response);
        }
    }).catch(error => {
        res.send(error);
    });
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});