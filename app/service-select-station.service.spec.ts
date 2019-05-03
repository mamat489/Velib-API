import { TestBed } from '@angular/core/testing';

import { ServiceSelectStationService } from './service-select-station.service';

describe('ServiceSelectStationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceSelectStationService = TestBed.get(ServiceSelectStationService);
    expect(service).toBeTruthy();
  });
});
