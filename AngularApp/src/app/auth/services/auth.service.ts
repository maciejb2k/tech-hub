import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import {
  AuthResponse,
  EmployeeRegistrationForm,
  LoginForm,
  RecruiterRegistrationForm,
} from '../interfaces/auth.interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  registerEmployee(formData: EmployeeRegistrationForm) {
    const url = 'http://localhost:8000/api/auth/register-employee';
    return this.http.post<AuthResponse>(url, formData).pipe(catchError(this.handleError));
  }

  registerRecruiter(formData: RecruiterRegistrationForm) {
    const url = 'http://localhost:8000/api/auth/register-recruiter';
    return this.http.post<AuthResponse>(url, formData).pipe(catchError(this.handleError));
  }

  login(formData: LoginForm) {
    const url = 'http://localhost:8000/api/auth/login';
    return this.http.post<AuthResponse>(url, formData).pipe(
      catchError(this.handleError),
      tap(response => this.setAuthInfo(response))
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  getAuthorizationToken() {
    return localStorage.getItem('token') || null;
  }

  roleBasedRedirect() {
    const role = localStorage.getItem('role');
    if (role === 'employee') {
      return '/employee';
    } else if (role === 'recruiter') {
      return '/recruiter';
    } else {
      return '/login';
    }
  }

  private setAuthInfo(response: AuthResponse) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('role', response.user_details.user.role.name);
    localStorage.setItem('email', response.user_details.user.email);
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error.error);
  }
}
