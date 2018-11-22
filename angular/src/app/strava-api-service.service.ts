import { Injectable } from '@angular/core';
import { Athlete } from './model/athlete';
import { Observable } from 'rxjs';
import { Configuration } from './model/configuration';
import { ACTIVITIES_URL } from './api-url.constants';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class StravaApiServiceService {
  private header() {
    return {
      headers: {
        accessToken: `${this.authenticationService.getUser().accessToken}`
      }
    };
  }

  constructor(private authenticationService: AuthenticationService) {
  }

  getActivities(config: Configuration): Observable<Athlete> {
    const url: URL = new URL(ACTIVITIES_URL);
    const params = {
      count: config.activityCount,
      duration: config.activityDuration,
      runs: config.activityTypes.get('Runs'),
      rides: config.activityTypes.get('Rides')
    };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    return new Observable<Athlete>(o => {
        fetch(url.href, this.header())
          .then(r => r.json())
          .then((a: Athlete) => o.next(a));
      });
  }
}
