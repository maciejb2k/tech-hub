import { ActivatedRouteSnapshot } from '@angular/router';

export const authGuard = (next: ActivatedRouteSnapshot) => {
  return true;
};
