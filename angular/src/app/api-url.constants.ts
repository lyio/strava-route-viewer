import { environment } from '../environments/environment';

const BASE_API_URL = environment.base_url;
const REDIRECT_URL = environment.redirect_url;

export const AUTHORIZE_URL = BASE_API_URL + `/strava/authorize?redirect=${REDIRECT_URL}`;
export const TOKEN_URL = BASE_API_URL + '/strava/token';

export const CONFIG_URL = BASE_API_URL + '/configuration';
export const ACTIVITIES_URL = BASE_API_URL + '/activities';
