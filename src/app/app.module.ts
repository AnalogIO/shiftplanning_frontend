import { RouterModule, Routes, CanActivate } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { 
  AuthGuardService as AuthGuard, AuthGuardService 
} from './auth-guard.service';
import { ShiftsComponent } from './shifts/shifts.component';
import { AuthService } from './auth.service';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'shifts', component: ShiftsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'shifts', pathMatch: 'full'},
  { path: '**', redirectTo: 'shifts' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ShiftsComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule
  ],
  providers: [AuthGuardService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
