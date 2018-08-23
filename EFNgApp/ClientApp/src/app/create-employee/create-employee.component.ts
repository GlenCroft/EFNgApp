import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { BackendService } from '../services/backend.service';
import { EmployeesStoreService } from '../services/employees-store.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  title = 'Create';
  errorMessage: any;
  cityList: Array<any> = [];
  loading: boolean;

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private backendService: BackendService,
    private employeesStore: EmployeesStoreService, private _router: Router) {

    this.employeeForm = this._fb.group({
      employeeId: 0,
      name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      department: ['', [Validators.required]],
      city: ['', [Validators.required]]
    });
  }

  ngOnInit() {

    this.backendService.getCityList().subscribe(
      (data: Array<any>) => this.cityList = data
    );

    const employeeId = Number(this._avRoute.snapshot.params['employeeId']);

    if (employeeId) {
      this.title = 'Edit';
      this.loading = true;

      this.employeesStore.employees
        .pipe(
          map((employees) => employees.find(e => e.employeeId === employeeId))
        )
        .subscribe(
          (employee) => {
            if (employee) {
              this.employeeForm.patchValue(employee);
              this.loading = false;
            }
          }
        );
    }

  }

  save() {

    if (!this.employeeForm.valid) {
      return;
    }

    if (this.title === 'Create') {
      this.employeesStore.saveEmployee(this.employeeForm.value)
        .subscribe(
          () => {
            this._router.navigate(['/fetch-employee']);
          },
          error => this.errorMessage = error);
    } else
    if (this.title === 'Edit') {
      this.employeesStore.updateEmployee(this.employeeForm.value)
        .subscribe(
          () => {
            this._router.navigate(['/fetch-employee']);
          },
          error => this.errorMessage = error);
    }
  }

  cancel() {
    this._router.navigate(['/fetch-employee']);
  }

  get name() { return this.employeeForm.get('name'); }
  get gender() { return this.employeeForm.get('gender'); }
  get department() { return this.employeeForm.get('department'); }
  get city() { return this.employeeForm.get('city'); }
}
