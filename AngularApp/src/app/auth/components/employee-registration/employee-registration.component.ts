import { Component } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

import { EmployeeRegistrationForm, ErrorResponse } from '../../interfaces/auth.interfaces';
import { AuthService } from '../../services/auth.service';
import { AuthFormService } from '../../services/auth-form.service';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.scss'],
  providers: [MessageService],
})
export class EmployeeRegistrationComponent {
  alerts: Message[] | undefined;

  registerForm = this.authFormService.getEmployeeRegistrationForm();

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private authFormService: AuthFormService,
    private formService: FormService
  ) {}

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.registerForm.disable();

    const formData = this.registerForm.value as EmployeeRegistrationForm;

    this.authService.registerEmployee(formData).subscribe({
      next: () => {
        this.registerForm.enable();
        this.registerForm.reset();
        this.alerts = [
          {
            severity: 'success',
            summary: 'Success',
            detail: 'Employee succesfully created.',
          },
        ];
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
}
