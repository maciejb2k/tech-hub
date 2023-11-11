import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { EmployeeRegistrationComponent } from './components/employee-registration/employee-registration.component';
import { RecruiterRegistrationComponent } from './components/recruiter-registration/recruiter-registration.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { authGuard } from './guards/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'register',
        component: RegistrationFormComponent,
        children: [
          { path: '', redirectTo: 'employee', pathMatch: 'full' },
          { path: 'employee', component: EmployeeRegistrationComponent },
          { path: 'recruiter', component: RecruiterRegistrationComponent },
        ],
      },
      {
        path: 'login',
        component: LoginFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AuthRoutingModule {}
