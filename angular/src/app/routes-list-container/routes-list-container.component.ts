import { Component, OnInit } from '@angular/core';
import { StravaApiServiceService } from '../strava-api-service.service';
import { Athlete } from '../model/athlete';

@Component({
  selector: 'app-routes-list-container',
  templateUrl: './routes-list-container.component.html',
  styleUrls: ['./routes-list-container.component.css']
})
export class RoutesListContainerComponent implements OnInit {

  private activities;

  private athlete: Athlete;

  constructor(private stravaApiService: StravaApiServiceService) { }

  async ngOnInit() {
    this.athlete = await this.stravaApiService.getAthleteData();
    this.activities = await this.stravaApiService.getActivities();
    console.dir(this.activities);
    console.dir(this.athlete);
  }
}
