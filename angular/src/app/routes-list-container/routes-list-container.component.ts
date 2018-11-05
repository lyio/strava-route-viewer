import { Component, OnInit, Input, SimpleChange, SimpleChanges, OnChanges } from '@angular/core';
import { StravaApiServiceService } from '../strava-api-service.service';
import { Athlete } from '../model/athlete';
import { Observable } from 'rxjs';
import { Activity } from '../model/acitvity';
import { Configuration } from '../model/configuration';

@Component({
  selector: 'app-routes-list-container',
  template: `<div>
    <app-routes-list [routes]="activities" [athlete]="athlete | async"></app-routes-list>
    </div>`,
  styleUrls: ['./routes-list-container.component.css']
})
export class RoutesListContainerComponent implements OnInit, OnChanges {

  @Input()
  configuration: Configuration;

  private activities: Array<Activity> = [];

  private athlete: Observable<Athlete>;

  constructor(private stravaApiService: StravaApiServiceService) { }

  ngOnInit() {
  }

  ngOnChanges({ configuration }: SimpleChanges) {
    if (configuration && configuration.currentValue) {
      this.athlete = this.stravaApiService.getAthleteData(configuration.currentValue);
      this.stravaApiService.getActivities(configuration.currentValue).subscribe(a => {
        this.activities = a;
      });
    }
  }
}
