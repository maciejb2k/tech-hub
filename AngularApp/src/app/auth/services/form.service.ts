import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  handleFormErrors(form: FormGroup, errors: { [key: string]: string[] }) {
    for (const controlName in errors) {
      if (form.get(controlName)) {
        form.get(controlName).setErrors({ serverError: errors[controlName][0] });
        form.get(controlName).markAsTouched();
      }
    }
  }
}
