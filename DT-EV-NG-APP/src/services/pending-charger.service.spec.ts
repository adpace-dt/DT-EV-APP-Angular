import { TestBed } from '@angular/core/testing';

import { PendingChargerService } from './pending-charger.service';

describe('PendingChargerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PendingChargerService = TestBed.get(PendingChargerService);
    expect(service).toBeTruthy();
  });
});
