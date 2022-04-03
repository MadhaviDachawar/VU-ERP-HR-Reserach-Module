import { TestBed } from '@angular/core/testing';

import { ProgrammeServiceDataYearly } from './programmedatayearly.service';

describe('ProgrammeServiceDataYearly', () => {
  let service: ProgrammeServiceDataYearly;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgrammeServiceDataYearly);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
