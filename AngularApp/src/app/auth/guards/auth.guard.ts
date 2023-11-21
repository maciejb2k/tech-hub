import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

export const authenticatedGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};

export const unauthenticatedGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};

export const roleGuard = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.hasRole(route.data['role'])) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
