import { TestBed } from '@angular/core/testing';

import { MapToSvgMapperService } from './map-to-svg-mapper.service';

describe('MapToSvgMapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapToSvgMapperService = TestBed.get(MapToSvgMapperService);
    expect(service).toBeTruthy();
  });
});
