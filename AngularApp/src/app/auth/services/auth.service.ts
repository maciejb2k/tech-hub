import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  EmployeeRegistrationForm,
  LoginForm,
  RecruiterRegistrationForm,
} from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  registerEmployee(formData: EmployeeRegistrationForm) {
    const url = 'http://localhost:8000/api/auth/register-employee';
    return this.http.post(url, formData).pipe(catchError(this.handleError));
  }

  registerRecruiter(formData: RecruiterRegistrationForm) {
    const url = 'http://localhost:8000/api/auth/register-recruiter';
    return this.http.post(url, formData).pipe(catchError(this.handleError));
  }

  login(formData: LoginForm) {
    const url = 'http://localhost:8000/api/auth/login';
    return this.http.post(url, formData).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error.error);
  }
}
