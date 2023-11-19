import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { passwordMatchValidator, urlValidator } from 'src/app/auth/validators/auth.validator';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  handleError(error: HttpErrorResponse) {
    return throwError(() => error.error);
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
