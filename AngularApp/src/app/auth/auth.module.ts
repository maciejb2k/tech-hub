// auth.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { EmployeeRegistrationComponent } from './components/employee-registration/employee-registration.component';
import { RecruiterRegistrationComponent } from './components/recruiter-registration/recruiter-registration.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
  ],
  declarations: [
    AuthLayoutComponent,
    RegistrationFormComponent,
    EmployeeRegistrationComponent,
    RecruiterRegistrationComponent,
    LoginFormComponent,
  ],
})
export class AuthModule {}
