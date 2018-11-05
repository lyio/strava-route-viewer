import { Component, EventEmitter } from '@angular/core';
import { Configuration } from './model/configuration';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'strava-route-printer';

  stravaConfiguration: Configuration;

  constructor() {
  }

  configChanged(config: Configuration) {
    this.stravaConfiguration = config;
  }

  ngDestroy() {
  }
}
