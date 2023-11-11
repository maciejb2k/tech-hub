import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { EmployeeRegistrationForm } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  registerEmployee(formData: Partial<EmployeeRegistrationForm>) {
    const url = 'http://localhost:8000/api/auth/register-employee';
    return this.http.post(url, formData).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error.error);
  }
}
