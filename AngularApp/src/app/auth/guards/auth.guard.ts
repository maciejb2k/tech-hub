import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authenticatedGuard = () => {
  const authService = inject(AuthService);
  return !authService.isAuthenticated();
};
