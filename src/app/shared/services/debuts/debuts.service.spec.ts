import { TestBed } from '@angular/core/testing';

import { DebutsService } from './debuts.service';

describe('DebutsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DebutsService = TestBed.get(DebutsService);
    expect(service).toBeTruthy();
  });
});
