import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Configuration } from '../model/configuration';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  public configurationModel: Configuration = new Configuration();

  @Output()
  configuration = new EventEmitter<Configuration>();

  public convertedDuration = 0;

  private includeRuns = true;

  private includeRides = false;

  constructor() {
    this.configurationModel.activityDuration = 1800;
    this.convertedDuration = this.configurationModel.activityDuration / 60;
  }

  ngOnInit() {
  }

  changeRuns() {
    this.includeRuns = !this.includeRuns;
  }

  changeRides() {
    this.includeRides = !this.includeRides;
  }

  displayRoutes(tokenElement: HTMLInputElement, durationElement: HTMLInputElement, countElement: HTMLInputElement) {
    const config = new Configuration();
    config.activityDuration = +durationElement.value * 60;
    config.activityTypes.set('Runs', this.includeRuns);
    config.activityTypes.set('Rides', this.includeRides);
    config.token = tokenElement.value;
    config.activityCount = +countElement.value;

    this.configuration.emit(config);
    return false;
  }
}
