import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Configuration } from '../model/configuration';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';

interface ConfigurationFormGroup {
  token: string;
  duration: number;
  includeRides: boolean;
  includeRuns: boolean;
  count: number;
}

function durationValidator({ value }: FormControl): { [s: string]: boolean } {
  if (!value && (value < 10 || value > 600)) {
    return { 'minmax': true };
  }

  return null;
}

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

  form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.configurationModel.activityDuration = 1800;
    this.convertedDuration = this.configurationModel.activityDuration / 60;

    this.form = formBuilder.group({
      token: [this.configurationModel.token, Validators.compose([Validators.required, durationValidator])],
      duration: [this.convertedDuration, durationValidator],
      includeRides: this.includeRides,
      includeRuns: this.includeRuns,
      count: [this.configurationModel.activityCount, Validators.required]
    });
  }

  ngOnInit() {
  }

  startStravaWorkflow() {
    window.open('/api/strava/authorize');
    return false;
  }

  displayRoutes(form: ConfigurationFormGroup) {
    const config = new Configuration();
    config.activityDuration = form.duration * 60;
    config.activityTypes.set('Runs', form.includeRuns);
    config.activityTypes.set('Rides', form.includeRides);
    config.token = form.token;
    config.activityCount = form.count;

    this.configuration.emit(config);
    return false;
  }
}
