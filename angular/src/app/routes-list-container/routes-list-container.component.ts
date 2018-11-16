import { Component, OnInit, Input, SimpleChange, SimpleChanges, OnChanges } from '@angular/core';
import { StravaApiServiceService } from '../strava-api-service.service';
import { Athlete } from '../model/athlete';
import { Observable } from 'rxjs';
import { Activity } from '../model/acitvity';
import { Configuration } from '../model/configuration';

@Component({
  selector: 'app-routes-list-container',
  templateUrl: './routes-list-container.component.html',
  styleUrls: ['./routes-list-container.component.css']
})
export class RoutesListContainerComponent implements OnInit, OnChanges {

  @Input()
  configuration: Configuration;

  private activities: Array<Activity> = [];

  private athlete: Observable<Athlete>;

  private showSpinner = false;

  constructor(private stravaApiService: StravaApiServiceService) { }

  ngOnInit() {
  }

  ngOnChanges({ configuration }: SimpleChanges) {
    if (configuration && configuration.currentValue) {
      this.showSpinner = true;
      this.athlete = this.stravaApiService.getAthleteData(configuration.currentValue);
      this.stravaApiService.getActivities(configuration.currentValue).subscribe(a => {
        this.activities = a;
        this.showSpinner = false;
      });
    }
  }
}
