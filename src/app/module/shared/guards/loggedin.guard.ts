import { CanActivateFn, Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { inject } from '@angular/core';
import { User } from '../interface/user.type';
import { Roles } from '../interface/role.model';

export const loggedinGuard: CanActivateFn = (route, state) => {
  const sharedService = inject(SharedService);
  const router = inject(Router);

  return !sharedService.accessToken
    ? true
    : router.parseUrl(getDashboardRoute(sharedService));
};

const getDashboardRoute = (service: SharedService) => {
  if (!Object.keys(service.userData$.value).length) {
    service.accessToken !== undefined ? service.decodeJwtToken() : '/home';
  }

  const user = service.userData$.value;
  if (user.role === Roles.Admin) {
    return '/dashboard/admin';
  } else if (user.role === Roles.Customer) {
    return '/dashboard/customer';
  } else {
    return '/dashboard/client';
  }
};
