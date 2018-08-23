import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../models/employee';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesStoreService {
  private _employees: BehaviorSubject<Employee[]> = new BehaviorSubject([]);

  constructor(private backendService: BackendService) {
    this.loadInitialData();
  }

  get employees() {
    return this._employees.asObservable();
  }

  loadInitialData() {
    this.backendService.getEmployees()
      .subscribe(
        res => this._employees.next(res),
        err => this.handleError(err)
      );
  }

  saveEmployee(employee: Employee) {
    const obs = this.backendService.saveEmployee(employee);

    obs.subscribe(
      (employeeId) => {
        employee.employeeId = employeeId;
        const temp = this._employees.getValue();
        temp.push(employee);
        this._employees.next(temp);
      },
      err => this.handleError(err)
    );

    return obs;
  }

  updateEmployee(employee: Employee) {
    const obs = this.backendService.updateEmployee(employee);

    obs.subscribe(
      () => {
        const temp = this._employees.getValue();
        temp[temp.findIndex(e => e.employeeId === employee.employeeId)] = employee;
        this._employees.next(temp);
      }
    );

    return obs;
  }

  deleteEmployee(employeeId: number) {
    const obs = this.backendService.deleteEmployee(employeeId);

    obs.subscribe(
      () => {
        const temp = this._employees.getValue().filter(e => e.employeeId !== employeeId);
        this._employees.next(temp);
      }
    );

    return obs;
  }

  handleError(err: Error) {
    console.log('Issues connecting: ', err);
  }
}
