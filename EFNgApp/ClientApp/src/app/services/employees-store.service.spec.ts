import { TestBed, inject } from '@angular/core/testing';

import { EmployeesStoreService } from './employees-store.service';

describe('EmployeesStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeesStoreService]
    });
  });

  it('should be created', inject([EmployeesStoreService], (service: EmployeesStoreService) => {
    expect(service).toBeTruthy();
  }));
});
