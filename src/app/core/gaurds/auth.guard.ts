import { inject, Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  console.log('inside authGuard')
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isLoggedIn()){
    console.log('logged in');
    return true;
  }else{
    console.log('not logged in');
    router.navigate(['/login']);
    return false;
  }

};
