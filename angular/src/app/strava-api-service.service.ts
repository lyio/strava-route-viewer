import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Athlete } from './model/athlete';
import { Observable } from 'rxjs';
import { Activity } from './model/acitvity';
import { Configuration } from './model/configuration';

@Injectable({
  providedIn: 'root'
})
export class StravaApiServiceService {
  private BASE_API = 'https://www.strava.com/api/v3';
  private header(token) { return {headers: {Authorization: `Bearer ${token}`}}}

  constructor(private http: HttpClient) {
  }

  getAthleteData({ token }: Configuration): Observable<Athlete> {
    let athlete;
    return new Observable<Athlete>(o => {
      fetch(`${this.BASE_API}/athlete`, this.header(token))
        .then(athleteResponse => athleteResponse.json())
        .then(athleteData => {
          athlete = athleteData;
          return fetch(`${this.BASE_API}/athletes/${athleteData.id}/stats`, this.header(token));
        })
        .then(athleteStatsResponse => athleteStatsResponse.json())
        .then(athleteStatsData => o.next(new Athlete(
          athlete.firstname,
          athlete.lastname,
          athleteStatsData.all_run_totals.distance,
          athleteStatsData.all_run_totals.elapsed_time
          )));
    });
  }

  getActivities(config: Configuration): Observable<Array<Activity>> {
    return new Observable<Array<any>>(o => {
      this.loadActivities(config.token, 1, new Array())
      .then(activities => o.next(
        activities
          .filter(a => this.filterActivities(config, a))
          .slice(0, config.activityCount)
          .map(a => {
            return {
              map: a.map,
              isRace: a.workout_type === 1
            };
          })));
      });
  }

  private filterActivities(config: Configuration, a) {
    const includeRuns = config.activityTypes.get('Runs');
    const includeRides = config.activityTypes.get('Rides');

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

  private loadActivities(token, page: number, activities: Array<Activity>) {
    return fetch(`${this.BASE_API}/athlete/activities?page=${page}&per_page=200`, this.header(token))
      .then(response => {
        return response.status === 200 ?
          response.json() :
          Promise.reject(new Error(`${response.status} - ${response.statusText}`));
      })
      .then(acts => {
        const combinedActivities = activities.concat(acts);
        return acts.length === 0 ? combinedActivities : this.loadActivities(token, page + 1, combinedActivities);
      })
      .catch(e => console.error(e));
  }
}
