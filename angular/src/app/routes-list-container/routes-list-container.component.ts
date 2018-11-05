import { Component, OnInit } from '@angular/core';
import { StravaApiServiceService } from '../strava-api-service.service';
import { Athlete } from '../model/athlete';
import { Observable } from 'rxjs';
import { Activity } from '../model/acitvity';

@Component({
  selector: 'app-routes-list-container',
  template: `<div>
    <app-routes-list [routes]="activities" [athlete]="athlete | async"></app-routes-list>
    </div>`,
  styleUrls: ['./routes-list-container.component.css']
})
export class RoutesListContainerComponent implements OnInit {

  private activities: Array<Activity>;

  private athlete: Observable<Athlete>;

  constructor(private stravaApiService: StravaApiServiceService) { }

  ngOnInit() {
    this.athlete = this.stravaApiService.getAthleteData();
    this.stravaApiService.getActivities().subscribe(a => {
      this.activities = a;
      console.dir(this.activities);
    });
  }
}
