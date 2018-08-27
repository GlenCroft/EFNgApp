import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';

import { EmployeesListComponent } from './employees-list.component';
import { BackendService } from '../services/backend.service';
import { BackendServiceMock, EMPLOYEES_MOCK } from '../services/backend.service.mock';

describe('EmployeesListComponent', () => {
  let component: EmployeesListComponent;
  let fixture: ComponentFixture<EmployeesListComponent>;

  const backendServiceMock = new BackendServiceMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesListComponent ],
      providers: [
        { provide: BackendService, useValue: backendServiceMock }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the list of Employees', () => {
    component.employees$.subscribe(
      (res) => {
        expect(res).toEqual(EMPLOYEES_MOCK);
      }
    );
  });

  it('should call to delete an Employee after user confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(backendServiceMock, 'deleteEmployee').and.returnValue(of(1));
    component.delete(EMPLOYEES_MOCK[0].employeeId);
    expect(backendServiceMock.deleteEmployee).toHaveBeenCalled();
  });

  it('should not call to delete an Employee without user confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(backendServiceMock, 'deleteEmployee');
    component.delete(EMPLOYEES_MOCK[0].employeeId);
    expect(backendServiceMock.deleteEmployee).not.toHaveBeenCalled();
  });
});
