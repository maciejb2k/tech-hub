import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';

export const authenticatedGuard = () => {
  const authService = inject(AuthService);
  return authService.isAuthenticated();
};

export const unauthenticatedGuard = () => {
  const authService = inject(AuthService);
  return !authService.isAuthenticated();
};

export const roleGuard = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  return authService.hasRole(route.data['role']);
};
