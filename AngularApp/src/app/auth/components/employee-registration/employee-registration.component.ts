import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { passwordMatchValidator } from 'src/app/shared/validators';

import { EmployeeRegistrationForm, ErrorResponse } from '../../interfaces/auth.interfaces';
import { AuthService } from '../../services/auth.service';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.scss'],
  providers: [MessageService],
})
export class EmployeeRegistrationComponent {
  alerts: Message[] | undefined;

  registerForm = this.formBuilder.group(
    {
      first_name: ['Wojciech', [Validators.required]],
      last_name: ['Rzasa', [Validators.required]],
      email: ['wrzasa@ur.edu.pl', [Validators.required, Validators.email]],
      password: ['12345678', [Validators.required, Validators.minLength(8)]],
      repeat_password: ['12345678', [Validators.required, Validators.minLength(8)]],
    },
    { validators: [passwordMatchValidator] }
  );

  constructor(
    private formBuilder: FormBuilder,
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

    const formData = this.registerForm.value as EmployeeRegistrationForm;

    this.authService.registerEmployee(formData).subscribe({
      next: () => {
        this.registerForm.enable();
        this.registerForm.reset();
        this.alerts = [
          {
            severity: 'success',
            summary: 'Success',
            detail: 'Account succesfully created',
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
}
