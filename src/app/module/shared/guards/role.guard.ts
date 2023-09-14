import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SharedService } from '../services/shared.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const shareService = inject(SharedService);
  const role = route.data['role'][0];
  console.log('in here');

  if (!Object.keys(shareService.userData$.value).length) {
    shareService.decodeJwtToken();
  }

  return role === shareService.userData$.value.role! ? true : false;
};
