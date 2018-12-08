import { RouterModule, Routes, CanActivate } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { 
  AuthGuardService as AuthGuard, AuthGuardService 
} from './auth-guard.service';
import { ShiftsComponent } from './shifts/shifts.component';
import { AuthService } from './auth.service';
import { EmployeesComponent } from './employees/employees.component';
import { ShiftDetailComponent } from './shift-detail/shift-detail.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';
import { ScheduledshiftDetailComponent } from './scheduledshift-detail/scheduledshift-detail.component';
import { FilterPipe } from './filter.pipe';

const appRoutes: Routes = [
  { path: '', redirectTo: 'shifts', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'shifts', component: ShiftsComponent, canActivate: [AuthGuard] },
  { path: 'shifts/:id', component: ShiftDetailComponent, canActivate: [AuthGuard] },
  { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard] },
  { path: 'employees/:id', component: EmployeeDetailComponent, canActivate: [AuthGuard] },
  { path: 'schedules', component: SchedulesComponent, canActivate: [AuthGuard] },
  { path: 'schedules/:id', component: ScheduleDetailComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ShiftsComponent,
    EmployeesComponent,
    ShiftDetailComponent,
    EmployeeDetailComponent,
    SchedulesComponent,
    ScheduleDetailComponent,
    ScheduledshiftDetailComponent,
    FilterPipe
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgSelectModule,
    LoadingBarHttpClientModule,
    NgbModule
  ],
  providers: [AuthGuardService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
