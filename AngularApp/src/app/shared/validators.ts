import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  let pass = control.get('password').value;
  let confirmPass = control.get('repeat_password').value;
  return pass === confirmPass ? null : { passwordMismatch: true };
};
