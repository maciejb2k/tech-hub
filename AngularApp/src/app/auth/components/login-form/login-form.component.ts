import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { AuthFormService } from '../../services/auth-form.service';
import { ErrorResponse, LoginForm } from '../../interfaces/auth.interfaces';
import { FormService } from 'src/app/shared/services/form.service';

import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  providers: [MessageService],
})
export class LoginFormComponent {
  alerts: Message[] | undefined;

  loginForm = this.authFormService.getLoginForm();

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private authFormService: AuthFormService,
    private formService: FormService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loginForm.disable();

    const formData = this.loginForm.value as LoginForm;

    this.authService.login(formData).subscribe({
      next: () => {
        this.loginForm.enable();
        this.loginForm.reset();
        this.router.navigate(['/']);
      },
      error: (error: ErrorResponse) => {
        this.loginForm.enable();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
        this.formService.handleFormErrors(this.loginForm, error.errors);
      },
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
