import * as got from 'got';

const BASE_API = 'https://www.strava.com/api/v3';
const header = (token) => { return { Authorization: `Bearer ${token}`}};

const Activities = {
    get: async ({ query }) => {
        return JSON.stringify(await getAthleteData(query));
    }
}

async function getAthleteData(query) {
    const config = {
        token: '',
        activityCount: query.count || 42,
        activityDuration: query.duration || 1800,
        activityTypes: {
            Runs: !!query.runs,
            Rides: !!query.rides
        }
    };
    const athleteResponse = await got.get(`${BASE_API}/athlete`, requestOptions);
    const athleteData = athleteResponse.body;
    const dataResponse = await got.get(`${BASE_API}/athletes/${athleteData.id}/stats`, requestOptions);
    const athleteStatsData = dataResponse.body;
    const activities = await getActivities(config);
    
    const response = {
        name: `${athleteData.firstname} ${athleteData.lastname}`,
        distance: Math.floor(athleteStatsData.all_run_totals.distance / 1000),
        time: Math.floor(athleteStatsData.all_run_totals.elapsed_time / 3600),
        activities
    }
    return response;
}

const requestOptions = { headers: header(''), json: true};

async function getActivities(config) {
    return new Promise((resolve, reject) => {
      loadActivities(config.token, 1, new Array())
      .then(activities => resolve(
        activities
          .filter(a => filterActivities(config, a))
          .slice(0, config.activityCount)
          .map(a => {
            return {
              map: a.map,
              isRace: a.workout_type === 1
            };
          })));
      });
  }

  function filterActivities(config, a) {
    const includeRuns = config.activityTypes['Runs'];
    const includeRides = config.activityTypes['Rides'];

    let result = a.map.summary_polyline != null &&
      a.moving_time >= config.activityDuration;

    if (!result) {
      return false;
    }

    if (includeRides && includeRuns) {
      result = result && (a.type === 'Run' || a.type === 'Ride');
    } else if (includeRuns && !includeRides) {
      result = result && a.type === 'Run';
    } else if (includeRides && !includeRuns) {
      result = result && a.type === 'Ride';
    } else {
      result = false;
    }

    return result;
  }

  function loadActivities(token, page, activities) {
    return got.get(`${BASE_API}/athlete/activities?page=${page}&per_page=200`, requestOptions)
      .then(({body: acts}) => {
        const combinedActivities = activities.concat(acts);
        return acts.length === 0 ? combinedActivities : loadActivities(token, page + 1, combinedActivities);
      })
      .catch(e => console.error(e));
  }

module.exports = Activities;
