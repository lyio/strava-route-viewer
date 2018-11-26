const { redirect, json, status } = require('server').reply;
const got = require('got');
const env = require('dotenv').config();

const STRAVA_API_URL = 'https://www.strava.com/api/v3/oauth';
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const authorize = ({query}) => {
  console.log(query);
  const redirectUrl = query.redirect;
  const oauthUrl = `${STRAVA_API_URL}/authorize?client_id=${CLIENT_ID}&approval_prompt=force&response_type=code&redirect_uri=${redirectUrl}&scope=activity:read_all,read`;
  console.log(oauthUrl);
  return redirect(oauthUrl);
};

const token = async ({body}) => {
  const { code } = JSON.parse(body);
  const stravaRequestBody = {
    'client_id': CLIENT_ID,
    'client_secret': CLIENT_SECRET,
    'code': code,
    'grant_type': 'authorization_code'
  };
  try {
    const authResponse = await got.post(`${STRAVA_API_URL}/token`, { body: stravaRequestBody, form: true });
    const {
      token_type,
      athlete,
      expires_at,
      expires_in,
      access_token
    } = JSON.parse(authResponse.body);
    console.log(access_token);
    return json({
      profile: athlete.profile_medium,
      name: `${athlete.firstname} ${athlete.lastname}`,
      tokenType: token_type,
      expiresAt: expires_at,
      expiresIn: expires_in,
      accessToken: access_token
    });
  } catch (err) {
    console.log(err);
    return status(500);
  }
};

const Strava = {
  AUTHORIZE_URL: '/api/strava/authorize',
  REDIRECT_URL: '/api/strava/token',
  authorize,
  token
};

module.exports = Strava;