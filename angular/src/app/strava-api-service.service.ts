import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Athlete } from './model/athlete';

@Injectable({
  providedIn: 'root'
})
export class StravaApiServiceService {
  private token = '';

  constructor(private http: HttpClient) {
  }

  async getAthleteData(): Promise<Athlete> {
    const athleteResponse = await fetch(
      `https://www.strava.com/api/v3/athlete`, { headers: {Authorization: `Bearer ${this.token}`}}
    );
    const athleteData = await athleteResponse.json();

    const athleteStatsResponse = await fetch(
      `https://www.strava.com/api/v3/athletes/${athleteData.id}/stats`,
      { headers: {Authorization: `Bearer ${this.token}`}}
    );

    const athleteStatsData = await athleteStatsResponse.json();
    const athlete = new Athlete(
      athleteData.firstname,
      athleteData.lastname,
      athleteStatsData.all_run_totals.distance,
      athleteStatsData.all_run_totals.elapsed_time
    );

    return athlete;
  }

  async getActivities() {
    const response = await fetch(
      'https://www.strava.com/api/v3/athlete/activities?per_page=200',
      { headers: {Authorization: `Bearer ${this.token}`}}
    );
    const activities = await response.json();
    const filteredActivities = activities
      .filter(a => a.type === 'Run' && a.moving_time > 2000).slice(0, 27)
      .map(a => {
        return {
          map: a.map,
          isRace: a.workout_type === 1
        };
      });

    return filteredActivities;
  }
}
