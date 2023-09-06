import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  let loggedUser = authService.getUser().subscribe();

  if (loggedUser !== undefined) {
    return true;
  }

  // Redirect to the login page
  return router.navigate(['/login']);
};
