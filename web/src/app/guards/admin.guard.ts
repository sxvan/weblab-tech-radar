import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Role } from '../types/role.enum';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  if (!token) {
    router.navigate(['login']);
    return false;
  }

  const decodedToken = jwtDecode(token) as JwtToken;
  if (decodedToken.role === 'CTO' || decodedToken.role === 'TECH_LEAD') {
    return true;
  }

  router.navigate(['login']);
  return false;
};

export interface JwtToken {
  role: Role;
}
