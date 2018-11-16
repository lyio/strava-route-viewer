const Activities = require('./api/activities/activities');

const server = require('server');
const { get } = server.router;
const { render } = server.reply;

// Launch server with options and a couple of routes
const home = get('/', ctx => render('index.html'));
const api = [
    get('/api/strava/authorize', ctx => 'strava authorize endpoint'),
    get('/api/activities', Activities.get)
];

server(home, api);