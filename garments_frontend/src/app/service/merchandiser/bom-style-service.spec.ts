import { TestBed } from '@angular/core/testing';

import { BomStyleService } from './bom-style-service';

describe('BomStyleService', () => {
  let service: BomStyleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BomStyleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
