import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { AuthService } from '../services/auth.service';
import { EMPTY, catchError, finalize } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  isLogoutInProgress = false;

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.isAuthenticated();

    if (!authToken) {
      return next.handle(req);
    }

    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${authToken}` },
    });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !this.isLogoutInProgress) {
          this.handleUnauthenticated();
          this.isLogoutInProgress = true;
        }

        throw error;
      })
    );
  }

  private handleUnauthenticated() {
    this.authService
      .logout()
      .pipe(
        catchError((err: any) => {
          this.authService.logoutUser();
          return EMPTY;
        }),
        finalize(() => {
          this.isLogoutInProgress = false;
        })
      )
      .subscribe();
  }
}
