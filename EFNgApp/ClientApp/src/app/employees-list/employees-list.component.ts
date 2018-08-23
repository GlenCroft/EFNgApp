import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeesStoreService } from '../services/employees-store.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent {
  loading = true;
  employees$: Observable<Employee[]>;

  constructor(private employeesStore: EmployeesStoreService) {
    this.employees$ = this.employeesStore.employees;
    this.employees$.subscribe(() => this.loading = false);
  }

  delete(employeeID) {
    const ans = confirm('Do you want to delete Employee with Id: ' + employeeID);
    if (ans) {
      this.employeesStore.deleteEmployee(employeeID);
    }
  }
}
