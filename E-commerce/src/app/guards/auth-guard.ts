import { CanActivateFn, Router } from '@angular/router';
import { Token } from '../services/token';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(Token);
  const router = inject(Router);
const token = tokenService.generateToken() || localStorage.getItem('token');
  if(!token)
  {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
