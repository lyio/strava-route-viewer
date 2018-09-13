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
            <RoutesList routes={this.state.routes}/>
        )
    }

    async _getStravaData() {
        const token = '';
        const response = await fetch('https://www.strava.com/api/v3/athlete/activities?per_page=200', { headers: {Authorization: `Bearer ${token}`}} );
        const activities = await response.json();
        const filteredActivities = activities.filter(a => a.type === 'Run' && a.moving_time > 2000).slice(0, 30);
        
        return filteredActivities;
    }
    
    async initialize() {
        const stuff = await this._getStravaData();
        const maps = stuff.map(activity => activity.map);

        this.setState(state => { return {routes: maps };})
      }
}