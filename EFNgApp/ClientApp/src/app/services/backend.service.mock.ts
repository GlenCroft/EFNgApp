/* istanbul ignore file */

import { Employee } from '../models/employee';
import { Observable, of } from 'rxjs';

export class BackendServiceMock {
  public cityData = CITIES_MOCK;
  public empData = EMPLOYEES_MOCK;

  getCityList(): Observable<any[]> {
    return of(this.cityData);
  }

  getEmployees(): Observable<Employee[]> {
    return of(this.empData);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return of(this.empData.find(e => e.employeeId === id));
  }

  saveEmployee(employee: Employee): Observable<number> {
    this.empData.push(employee);
    return of(1);
  }

  updateEmployee(employee: Employee): Observable<number> {
    this.empData[this.empData.findIndex(e => e.employeeId === employee.employeeId)] = employee;
    return of(1);
  }

  deleteEmployee(id: number): Observable<number> {
    this.empData.splice(this.empData.findIndex(e => e.employeeId === id), 1);
    return of(1);
  }
}

export const CITIES_MOCK = [
  {
    cityId: 1,
    cityName: 'Hyderabad'
  },
  {
    cityId: 2,
    cityName: 'Mumbai'
  },
  {
    cityId: 3,
    cityName: 'London'
  }
];

export const EMPLOYEES_MOCK = [
  {
    employeeId: 1,
    name: 'Joe Bloggs',
    gender: 'Male',
    department: 'Engineering',
    city: 'Hyderabad'
  },
  {
    employeeId: 2,
    name: 'Barbara Roberts',
    gender: 'Female',
    department: 'Client Services',
    city: 'Mumbai'
  }
];
