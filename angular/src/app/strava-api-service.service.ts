import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Athlete } from './model/athlete';
import { Observable } from 'rxjs';
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

  getActivities(config: Configuration): Observable<Athlete> {
    return new Observable<Athlete>(o => {
        fetch(`/api/activities?count=${config.activityCount}&duration=${config.activityDuration}&runs=${config.activityTypes.get('Runs')}&rides=${config.activityTypes.get('Rides')}`)
          .then(r => r.json())
          .then((a: Athlete) => o.next(a));
      });
  }
}
