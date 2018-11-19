const Strava = require('./api/strava/strava');
const server = require('server');
const Activities =  require('./api/activities/activities');

const { get } = server.router;
const { render } = server.reply;

// Launch server with options and a couple of routes
const home = get('/', ctx => render('index.html'));
const api = [
    get(Strava.AUTHORIZE_URL, Strava.authorize),
    get(Strava.REDIRECT_URL, Strava.redirect),
    get('/api/activities', Activities.get)
];

const routes = [home, api];
server({ security: { csrf: false }, views: './public'}, ...routes);
