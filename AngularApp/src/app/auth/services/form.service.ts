import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator, urlValidator } from 'src/app/auth/validators/auth.validator';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private formBuilder: FormBuilder) {}

  getLoginForm() {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  getBaseRegistrationForm() {
    return this.formBuilder.group(
      {
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        repeat_password: ['', [Validators.required, Validators.minLength(8)]],
      },
      { validators: [passwordMatchValidator] }
    );
  }

  // Alias for getBaseRegistrationForm()
  getEmployeeRegistrationForm() {
    return this.getBaseRegistrationForm();
  }

  getRecruiterRegistrationForm() {
    const baseForm = this.getBaseRegistrationForm();

    return this.formBuilder.group(
      {
        ...baseForm.controls,
        company_name: ['', [Validators.required]],
        company_url: ['', [urlValidator]],
      },
      { validators: [passwordMatchValidator] }
    );
  }

  handleFormErrors(form: FormGroup, errors: { [key: string]: string[] }) {
    for (const controlName in errors) {
      if (form.get(controlName)) {
        form.get(controlName).setErrors({ serverError: errors[controlName][0] });
        form.get(controlName).markAsTouched();
      }
    }
  }
}
