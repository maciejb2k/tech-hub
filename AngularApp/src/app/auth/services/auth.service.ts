import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Subject, of, throwError } from 'rxjs';
import { catchError, finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import {
  AuthResponse,
  EmployeeRegistrationForm,
  LoginForm,
  ProfileData,
  ProfileResponse,
  RecruiterRegistrationForm,
} from '../interfaces/auth.interfaces';
import { FormService } from 'src/app/shared/services/form.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubject: BehaviorSubject<ProfileData | null> = new BehaviorSubject<ProfileData | null>(null);

  private fetchingUser: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient, private router: Router, private formService: FormService) {}

  registerEmployee(formData: EmployeeRegistrationForm) {
    const url = `${environment.apiBaseUrl}/auth/register-employee`;

    return this.http
      .post<AuthResponse>(url, formData)
      .pipe(catchError(this.formService.handleError));
  }

  registerRecruiter(formData: RecruiterRegistrationForm) {
    const url = `${environment.apiBaseUrl}/auth/register-recruiter`;

    return this.http
      .post<AuthResponse>(url, formData)
      .pipe(catchError(this.formService.handleError));
  }

  login(formData: LoginForm) {
    const url = `${environment.apiBaseUrl}/auth/login`;

    return this.http.post<AuthResponse>(url, formData).pipe(
      catchError(this.formService.handleError),
      tap(response => {
        this.setToken(response.token);
        this.getUserData().pipe(takeUntil(this.destroy$)).subscribe();
      })
    );
  }

  logout() {
    const url = `${environment.apiBaseUrl}/auth/logout`;

    return this.http.post(url, {}).pipe(
      tap(() => {
        this.logoutUser();
        this.router.navigate(['/auth/login']);
      })
    );
  }

  logoutUser() {
    this.removeToken();
    this.clearUser();
  }

  getUserData() {
    return this.userSubject.pipe(
      switchMap(user => {
        if (!(user === null && this.isAuthenticated())) {
          return of(user);
        }

        if (this.fetchingUser) {
          return of(null);
        }

        this.fetchingUser = true;
        return this.fetchUserData().pipe(
          catchError(() => of(null)),
          finalize(() => {
            this.fetchingUser = false;
          })
        );
      })
    );
  }

  getRole() {
    return this.getUser().pipe(map(user => (user ? user.role : null)));
  }

  hasRole(role: string) {
    return this.getRole().pipe(map(userRole => userRole === role));
  }

  isAuthenticated() {
    return localStorage.getItem('token');
  }

  updateUserName(firstName: string, lastName: string) {
    this.userSubject.next({
      ...this.userSubject.value,
      first_name: firstName,
      last_name: lastName,
    });
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private removeToken(): void {
    localStorage.removeItem('token');
  }

  fetchUserData() {
    const url = `${environment.apiBaseUrl}/profile`;

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

  getUser() {
    return this.userSubject.asObservable();
  }

  private setUser(userDetails: ProfileData) {
    this.userSubject.next(userDetails);
  }

  private clearUser() {
    this.userSubject.next(null);
  }

  unsubscribeUserData() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnDestroy() {
    this.unsubscribeUserData();
  }
}
