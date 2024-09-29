import { TestBed } from '@angular/core/testing';

import { MaterialRegisterService } from './material-register.service';

describe('MaterialRegisterService', () => {
  let service: MaterialRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
