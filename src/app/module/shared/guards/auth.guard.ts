import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  console.log('in here');

  return !!localStorage.getItem('token') ? true : router.navigate(['/home']);
};
