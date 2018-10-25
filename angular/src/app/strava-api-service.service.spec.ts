import { TestBed } from '@angular/core/testing';

import { StravaApiServiceService } from './strava-api-service.service';

describe('StravaApiServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StravaApiServiceService = TestBed.get(StravaApiServiceService);
    expect(service).toBeTruthy();
  });
});
