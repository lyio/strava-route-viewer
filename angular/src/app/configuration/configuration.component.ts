import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Configuration } from '../model/configuration';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ConfigApiService } from '../config-api.service';
import { AuthenticationService } from '../authentication.service';

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

  public userName: string;

  @Output()
  configuration = new EventEmitter<Configuration>();

  public convertedDuration = 0;

  private includeRuns = true;

  private includeRides = false;

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private configApiService: ConfigApiService,
    private authenticationService: AuthenticationService) {

      this.form = this.formBuilder.group({
      duration: [this.convertedDuration, durationValidator],
      includeRides: this.includeRides,
      includeRuns: this.includeRuns,
      count: [this.configurationModel.activityCount, Validators.required]
    });
  }

  ngOnInit() {
    const { name } = this.authenticationService.getUser() || { name: ''};
    this.userName = name;

    this.configApiService.getConfiguration().subscribe(config => {
      this.configurationModel = config;
      this.form = this.formBuilder.group({
        duration: [this.configurationModel.activityDuration / 60, durationValidator],
        includeRides: this.includeRides,
        includeRuns: this.includeRuns,
        count: [this.configurationModel.activityCount, Validators.required]
      });
    });
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
