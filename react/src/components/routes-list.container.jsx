import React from 'react';
import { RoutesList } from './routes-list.component';

export class RoutesListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            routes: []
        };
    }

    async componentWillMount() {
        this.initialize();
    }

    render() {
        return (
            <RoutesList routes={this.state.routes} athlete={this.state.athleteStats}/>
        )
    }

    async _getStravaData(token) {
        const athleteResponse = await fetch(`https://www.strava.com/api/v3/athlete`, { headers: {Authorization: `Bearer ${token}`}} );
        const athlete = await athleteResponse.json();
        
        const response = await fetch('https://www.strava.com/api/v3/athlete/activities?per_page=200', { headers: {Authorization: `Bearer ${token}`}} );
        const activities = await response.json();
        const filteredActivities = activities.filter(a => a.type === 'Run' && a.moving_time > 2000).slice(0, 30);
        
        const athleteStatsResponse = await fetch(`https://www.strava.com/api/v3/athletes/${athlete.id}/stats`, { headers: {Authorization: `Bearer ${token}`}} );
        const athleteStatsData = await athleteStatsResponse.json();
        
        return [filteredActivities, this._getAthleteData(athlete, athleteStatsData.all_run_totals)];
    }
    
    async initialize() {
        const [stuff, athlete] = await this._getStravaData(this.props.token);
        const maps = stuff.map(activity => { return { map: activity.map, isRace: activity.workout_type === 1};});

        this.setState(state => { return {routes: maps, athleteStats: athlete };})
    }

    _getAthleteData({ firstname, lastname }, { distance, elapsed_time }) {
        return { 
            name: `${firstname} ${lastname}`,
            distance: `${Math.floor(distance / 1000)} km`,
            time: `${Math.floor(elapsed_time / 3600)}h`
        };
    }
}