import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BackendService } from './services/backend.service';
import { EmployeesStoreService } from './services/employees-store.service';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesListComponent,
    CreateEmployeeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: EmployeesListComponent },
      { path: 'register-employee', component: CreateEmployeeComponent },
      { path: 'employee/edit/:employeeId', component: CreateEmployeeComponent },
      { path: '**', redirectTo: 'home' }
    ])
  ],
  providers: [BackendService, EmployeesStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
