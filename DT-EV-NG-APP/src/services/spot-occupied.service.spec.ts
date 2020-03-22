import { TestBed } from '@angular/core/testing';

import { SpotOccupiedService } from './spot-occupied.service';

describe('SpotOccupiedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpotOccupiedService = TestBed.get(SpotOccupiedService);
    expect(service).toBeTruthy();
  });
});
