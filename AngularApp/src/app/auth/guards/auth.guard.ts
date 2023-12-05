import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { map, skipWhile, take } from 'rxjs';

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

  return authService.userSubject.pipe(
    skipWhile(user => !user),
    take(1),
    map(user => {
      if (user.role !== route.data['role']) {
        router.navigate(['/']);
        return false;
      }

      return true;
    })
  );
};
