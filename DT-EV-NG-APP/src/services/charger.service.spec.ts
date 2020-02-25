import { TestBed } from '@angular/core/testing';

import { ChargerService } from './charger.service';

describe('ChargerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChargerService = TestBed.get(ChargerService);
    expect(service).toBeTruthy();
  });
});
