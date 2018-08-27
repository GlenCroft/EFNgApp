import {
  async,
  TestBed,
  getTestBed
} from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { BackendService } from './backend.service';
import { Employee } from '../models/employee';
import { CITIES_MOCK, EMPLOYEES_MOCK } from './backend.service.mock';

describe('BackendService', () => {
  let testBed: TestBed;
  let service: BackendService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: 'BASE_URL', useFactory: () => 'http://localhost:9876/', deps: [] },
        BackendService,
      ]
    });

    testBed = getTestBed();
    service = testBed.get(BackendService);
    httpMock = testBed.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should return the list of Cities from the server on success', () => {
    service.getCityList().subscribe((res: any[]) => {
      expect(res).toEqual(CITIES_MOCK);
    });
    httpMock.expectOne({
      url: `${service.myAppUrl}api/Employee/GetCityList`,
      method: 'GET'
    }).flush(CITIES_MOCK);
  });


  it('should return the list of Employees from the server on success', () => {
    service.getEmployees().subscribe((res: Employee[]) => {
      expect(res).toEqual(EMPLOYEES_MOCK);
    });
    httpMock.expectOne({
      url: `${service.myAppUrl}api/Employee/Index`,
      method: 'GET'
    }).flush(EMPLOYEES_MOCK);
  });

  it('should return the details of an Employee given the ID', () => {
    service.getEmployeeById(EMPLOYEES_MOCK[0].employeeId).subscribe((res: Employee) => {
      expect(res).toEqual(EMPLOYEES_MOCK[0]);
    });
    httpMock.expectOne({
      url: `${service.myAppUrl}api/Employee/Details/${EMPLOYEES_MOCK[0].employeeId}`,
      method: 'GET'
    }).flush(EMPLOYEES_MOCK[0]);
  });

  it('should submit Employee details to be saved', () => {
    service.saveEmployee(EMPLOYEES_MOCK[0]).subscribe((res: any) => {
      expect(res).toEqual(1);
    });
    httpMock.expectOne((req) => {
      return req.url === `${service.myAppUrl}api/Employee/Create`
          && req.method === 'POST'
          && req.body === EMPLOYEES_MOCK[0];
    }).flush(1);
  });

  it('should submit Employee details to be updated', () => {
    service.updateEmployee(EMPLOYEES_MOCK[0]).subscribe((res: any) => {
      expect(res).toEqual(1);
    });
    httpMock.expectOne((req) => {
      return req.url === `${service.myAppUrl}api/Employee/Edit`
          && req.method === 'PUT'
          && req.body === EMPLOYEES_MOCK[0];
    }).flush(1);
  });

  it('should submit Employee ID to be deleted', () => {
    service.deleteEmployee(EMPLOYEES_MOCK[0].employeeId).subscribe((res: any) => {
      expect(res).toEqual(1);
    });
    httpMock.expectOne({
      url: `${service.myAppUrl}api/Employee/Delete/${EMPLOYEES_MOCK[0].employeeId}`,
      method: 'DELETE'
    }).flush(1);
  });

});

