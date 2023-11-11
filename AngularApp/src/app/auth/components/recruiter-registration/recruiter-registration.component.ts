import { Component } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

import {
  EmployeeRegistrationForm,
  ErrorResponse,
  RecruiterRegistrationForm,
} from '../../interfaces/auth.interfaces';
import { AuthService } from '../../services/auth.service';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-recruiter-registration',
  templateUrl: './recruiter-registration.component.html',
  styleUrls: ['./recruiter-registration.component.scss'],
  providers: [MessageService],
})
export class RecruiterRegistrationComponent {
  alerts: Message[] | undefined;

  registerForm = this.formService.getRecruiterRegistrationForm();

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private formService: FormService
  ) {}

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.registerForm.disable();

    const formData = this.registerForm.value as RecruiterRegistrationForm;

    this.authService.registerRecruiter(formData).subscribe({
      next: () => {
        this.registerForm.enable();
        this.registerForm.reset();
        this.alerts = [
          {
            severity: 'success',
            summary: 'Success',
            detail: 'Recruiter succesfully created',
          },
        ];

        // TODO: Token handling
      },
      error: (error: ErrorResponse) => {
        this.registerForm.enable();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
        this.formService.handleFormErrors(this.registerForm, error.errors);
      },
    });
  }

  get firstName() {
    return this.registerForm.get('first_name');
  }

  get lastName() {
    return this.registerForm.get('last_name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get repeatPassword() {
    return this.registerForm.get('repeat_password');
  }

  get companyName() {
    return this.registerForm.get('company_name');
  }

  get companyUrl() {
    return this.registerForm.get('company_url');
  }
}
