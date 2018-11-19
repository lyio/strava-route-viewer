import * as server from 'server';
import {Activities} from './api/activities/activities';

const { get } = server.router;
const { render } = server.reply;

// Launch server with options and a couple of routes
const home = get('/', ctx => render('index.html'));
const api = [
    get('/api/strava/authorize', ctx => {
        console.log(ctx.session.token);
        ctx.session.token = '12345764351'
        return 'look in the session';
    }),
    get('/api/activities', Activities.get)
];
const options = {
    views: './angular/dist/strava-route-printer/',
    public: './angular/dist/strava-route-printer/'
};
server(options, home, api);