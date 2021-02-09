import { TestBed } from '@angular/core/testing';

import { ZapadbService } from './zapadb.service';

describe('ZapadbService', () => {
  let service: ZapadbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZapadbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
