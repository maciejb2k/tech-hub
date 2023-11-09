import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { EmployeeRegistrationComponent } from './components/employee-registration/employee-registration.component';
import { RecruiterRegistrationComponent } from './components/recruiter-registration/recruiter-registration.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule, RegistrationRoutingModule],
  declarations: [
    RegistrationFormComponent,
    EmployeeRegistrationComponent,
    RecruiterRegistrationComponent,
  ],
})
export class RegistrationModule {}
