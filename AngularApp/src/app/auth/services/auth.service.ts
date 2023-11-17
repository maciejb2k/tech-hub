import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map, takeUntil, tap } from 'rxjs/operators';

import {
  AuthResponse,
  EmployeeRegistrationForm,
  LoginForm,
  ProfileData,
  ProfileResponse,
  RecruiterRegistrationForm,
} from '../interfaces/auth.interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: BehaviorSubject<ProfileData | null> = new BehaviorSubject<ProfileData | null>(null);
  private destroy$: Subject<void> = new Subject<void>();

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
      tap(response => {
        this.setToken(response.token);
        this.getUserData().pipe(takeUntil(this.destroy$)).subscribe();
      })
    );
  }

  logout() {
    const url = 'http://localhost:8000/api/auth/logout';
    return this.http.post(url, {}).pipe(
      tap(() => {
        this.removeToken();
        this.clearUser();
        this.router.navigate(['/auth/login']);
      })
    );
  }

  getUserData() {
    if (this.user$.value === null && this.isAuthenticated()) {
      return this.fetchUserData();
    }
    return this.user$.asObservable();
  }

  getRole() {
    return this.getUserData().pipe(map(user => (user ? user.role : null)));
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

  isAuthenticated() {
    return localStorage.getItem('token');
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private removeToken(): void {
    localStorage.removeItem('token');
  }

  private fetchUserData(): Observable<ProfileData> {
    const url = 'http://localhost:8000/api/profile';
    return this.http.get<ProfileResponse>(url).pipe(
      map((response: ProfileResponse) => {
        const data = response['employee'].user || response['recruiter'].user;
        const userDetails: ProfileData = {
          id: data.id,
          email: data.email,
          role: data.role.name,
          first_name: data.first_name,
          last_name: data.last_name,
        };

        return userDetails;
      }),
      tap(userDetails => {
        this.setUser(userDetails);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error.error);
      })
    );
  }

  private setUser(userDetails: ProfileData) {
    this.user$.next(userDetails);
  }

  private clearUser() {
    this.user$.next(null);
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error.error);
  }

  unsubscribeUserData() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnDestroy() {
    this.unsubscribeUserData();
  }
}
