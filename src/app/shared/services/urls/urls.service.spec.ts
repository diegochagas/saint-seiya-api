import { TestBed } from '@angular/core/testing';

import { UrlsService } from './urls.service';

describe('UrlsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UrlsService = TestBed.get(UrlsService);
    expect(service).toBeTruthy();
  });
});
