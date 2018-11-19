import * as got from 'got';

const BASE_API = 'https://www.strava.com/api/v3';
const header = (token) => { return { Authorization: `Bearer ${token}`}};

export const Activities = {
    get: (ctx) => {
        return getAthleteData();
    }
}

function getActivities(athleteId) {

}

async function getAthleteData() {
    const response = await got.get(`${BASE_API}/athlete`, { headers: header(''), json: true});
    return response.body;
}
