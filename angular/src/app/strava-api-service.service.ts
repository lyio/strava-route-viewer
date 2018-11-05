import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Athlete } from './model/athlete';
import { Observable } from 'rxjs';
import { Activity } from './model/acitvity';

@Injectable({
  providedIn: 'root'
})
export class StravaApiServiceService {
  private token = '';
  private BASE_API = 'https://www.strava.com/api/v3';
  private header = { headers: {Authorization: `Bearer ${this.token}`}};

  constructor(private http: HttpClient) {
  }

  getAthleteData(): Observable<Athlete> {
    let athlete;
    return new Observable<Athlete>(o => {
      fetch(`${this.BASE_API}/athlete`, this.header)
        .then(athleteResponse => athleteResponse.json())
        .then(athleteData => {
          athlete = athleteData;
          return fetch(`${this.BASE_API}/athletes/${athleteData.id}/stats`, this.header);
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

  getActivities(): Observable<Array<Activity>> {
    return new Observable<Array<any>>(o => {
      this.loadActivities(1, new Array())
      .then(activities => o.next(
        activities
          .filter(a => a.type === 'Run' && a.moving_time > 1800 && a.map.summary_polyline != null).slice(0, 42)
          .map(a => {
            return {
              map: a.map,
              isRace: a.workout_type === 1
            };
          })));
      });
  }

  private loadActivities(page: number, activities: Array<Activity>) {
    return fetch(`${this.BASE_API}/athlete/activities?page=${page}&per_page=200`, this.header)
      .then(response => response.json())
      .then(acts => {
        const combinedActivities = activities.concat(acts);
        return acts.length === 0 ? combinedActivities : this.loadActivities(page + 1, combinedActivities);
      });
  }
}
