import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Token } from '../services/token';
import { Http } from '../services/http';
import { map } from 'rxjs/operators';

export const adminGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(Token);
  const api = inject(Http);
  const router = inject(Router);
  const token = tokenService.getToken() || (localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth') as string) : '');
  if (!token) {
    router.navigate(['/account/login']);
    return false;
  }
  return api.getUserByToken(token).pipe(
    map((u) => {
      if (u && u.role === 'admin') return true;
      router.navigate(['/']);
      return false;
    })
  );
};


