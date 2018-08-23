import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  myAppUrl = '';

  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  getCityList() {
    return this._http.get<any[]>(this.myAppUrl + 'api/Employee/GetCityList');
  }

  getEmployees() {
    return this._http.get<Employee[]>(this.myAppUrl + 'api/Employee/Index');
  }

  getEmployeeById(employeeId: number) {
    return this._http.get<Employee>(this.myAppUrl + 'api/Employee/Details/' + employeeId);
  }

  saveEmployee(employee: Employee) {
    return this._http.post<number>(this.myAppUrl + 'api/Employee/Create', employee).pipe(share());
  }

  updateEmployee(employee: Employee) {
    return this._http.put(this.myAppUrl + 'api/Employee/Edit', employee);
  }

  deleteEmployee(employeeId: number) {
    return this._http.delete(this.myAppUrl + 'api/Employee/Delete/' + employeeId);
  }
}
