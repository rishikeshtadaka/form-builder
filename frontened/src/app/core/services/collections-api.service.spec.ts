import { TestBed } from '@angular/core/testing';

import { CollectionsApiService } from './collections-api.service';

describe('CollectionsApiService', () => {
  let service: CollectionsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
