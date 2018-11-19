const { render, redirect, header, cookie } = require('server').reply;
const got = require('got');

const STRAVA_API_URL = 'https://www.strava.com/api/v3/oauth';
const CLIENT_ID = '';
const CLIENT_SECRET = '';

const authorize = ({query}) => {
  const oauthUrl = `${STRAVA_API_URL}/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000/api/strava/redirect&scope=activity:read_all,read`;
  return redirect(oauthUrl);
};

const redirectTarget = async ({ query }) => {
  console.log(query);
  const tokenQuery = new URLSearchParams(
    [
      ['client_id', CLIENT_ID],
      ['client_secret', CLIENT_SECRET],
      ['code', query.code],
      ['grant_type', 'authorization_code']
    ]
  );
  const body = {
    'client_id': CLIENT_ID,
    'client_secret': CLIENT_SECRET,
    'code': query.code,
    'grant_type': 'authorization_code'
  };
  console.log(body);
  const authResponse = await got.post(`${STRAVA_API_URL}/token`, { body, form: true });
  const asJson = JSON.parse(authResponse.body);
  console.log(asJson);
  return cookie('token', asJson.access_token).send(`
    <html>
    <body>
      <p>Authorization successfull. This page can be closed.</p>
      <p>${asJson.expires_at}</p>
      <p>${asJson.access_token}</p>
    </body>
    </html>
  `);
};

const Strava = {
  AUTHORIZE_URL: '/api/strava/authorize',
  REDIRECT_URL: '/api/strava/redirect',
  authorize,
  redirect: redirectTarget
};

module.exports = Strava;