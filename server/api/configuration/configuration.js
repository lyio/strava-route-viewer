const { json } = require('server').reply;

const Configuration = {
    CONFIG_URL: '/api/configuration',
    get: () => {
        return json((createConfigObject()));
    }
}

function createConfigObject() {
    const config = {
        activityCount: 42,
        activityDuration: 1800,
        activityTypes: {
            Runs: true,
            Rides: false
        }
    };

    return config;
}

module.exports = Configuration;