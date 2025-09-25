import { CanActivateFn, Router } from '@angular/router';
import { Token } from '../services/token';
import { inject } from '@angular/core';
import { NotifyService } from '../services/notify.service';
export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(Token);
  const router = inject(Router);
  const notify = inject(NotifyService);
  const token = tokenService.getToken() || (localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth') as string) : '');
  if(!token)
  {
    notify.show('You must login to continue.', 'warning');
    router.navigate(['/account/login']);
    return false;
  }
  return true;
};
