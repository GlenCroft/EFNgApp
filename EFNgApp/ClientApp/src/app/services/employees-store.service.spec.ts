import { TestBed, inject } from '@angular/core/testing';

import { EmployeesStoreService } from './employees-store.service';
import { BackendService } from '../services/backend.service';
import { BackendServiceMock, EMPLOYEES_MOCK } from '../services/backend.service.mock';

describe('EmployeesStoreService', () => {
  const backendServiceMock = new BackendServiceMock();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EmployeesStoreService,
        { provide: BackendService, useValue: backendServiceMock }
      ]
    });
  });

  it('should be created', inject([EmployeesStoreService], (service: EmployeesStoreService) => {
    expect(service).toBeTruthy();
  }));
});
