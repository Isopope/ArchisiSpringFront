import { TestBed } from '@angular/core/testing';

import { TerrainsService } from './terrains.service';

describe('TerrainsService', () => {
  let service: TerrainsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerrainsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
