const server = require('server');
const Configuration = require('./api/configuration/configuration');
const Strava = require('./api/strava/strava');
const Activities =  require('./api/activities/activities');

const { get, post } = server.router;
const { render } = server.reply;

// Launch server with options and a couple of routes
const home = get('/', ctx => render('index.pug'));
const api = [
    get(Strava.AUTHORIZE_URL, Strava.authorize),
    post(Strava.REDIRECT_URL, Strava.token),
    get(Configuration.CONFIG_URL, Configuration.get),
    get(Activities.ACTIVITIES_URL, Activities.get)
];

const corsExpress = require('cors')({
    origin: ['http://localhost:4200', process.env.CLIENT_DOMAIN]
  });
  
  // Make the express middleware compatible with server
const cors = server.utils.modern(corsExpress);

const routes = [home, api];
server({ security: { csrf: false } }, cors, ...routes);
