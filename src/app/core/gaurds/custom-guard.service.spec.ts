import { TestBed } from '@angular/core/testing';

import { CustomGuardService } from './custom-guard.service';

describe('CustomGuardService', () => {
  let service: CustomGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
