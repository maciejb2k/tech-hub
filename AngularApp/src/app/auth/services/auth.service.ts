import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, of, throwError } from 'rxjs';
import { catchError, finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators';

import {
  AuthResponse,
  EmployeeRegistrationForm,
  LoginForm,
  ProfileData,
  ProfileResponse,
  RecruiterRegistrationForm,
} from '../interfaces/auth.interfaces';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: BehaviorSubject<ProfileData | null> = new BehaviorSubject<ProfileData | null>(null);
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient, private router: Router, private formService: FormService) {}

  registerEmployee(formData: EmployeeRegistrationForm) {
    const url = 'http://localhost:8000/api/auth/register-employee';
    return this.http
      .post<AuthResponse>(url, formData)
      .pipe(catchError(this.formService.handleError));
  }

  registerRecruiter(formData: RecruiterRegistrationForm) {
    const url = 'http://localhost:8000/api/auth/register-recruiter';
    return this.http
      .post<AuthResponse>(url, formData)
      .pipe(catchError(this.formService.handleError));
  }

  login(formData: LoginForm) {
    const url = 'http://localhost:8000/api/auth/login';
    return this.http.post<AuthResponse>(url, formData).pipe(
      catchError(this.formService.handleError),
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
    return this.user$.pipe(
      switchMap(user => {
        if (user === null && this.isAuthenticated()) {
          return this.fetchUserData().pipe(
            finalize(() => {
              return this.user$.asObservable();
            })
          );
        }
        return of(user);
      })
    );
  }

  getRole() {
    return this.getUserData().pipe(map(user => (user ? user.role : null)));
  }

  hasRole(role: string) {
    return this.getRole().pipe(map(userRole => userRole === role));
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
        const data = response['employee'] || response['recruiter'];
        const userData = data.user;

        const userDetails: ProfileData = {
          id: data.id,
          user_id: userData.id,
          email: userData.email,
          role: userData.role.name,
          first_name: userData.first_name,
          last_name: userData.last_name,
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
