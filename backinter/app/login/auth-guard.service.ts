import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { AuthService }      from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   let url: string = state.url;

  //   return this.checkLogin(url);
  // }

  // checkLogin(url: string): boolean {
  //   if (this.authService.isLoggedIn) { return true; }

  //   // Store the attempted URL for redirecting
  //   this.authService.redirectUrl = url;

  //   // Navigate to the login page with extras
  //   this.router.navigate(['/login']);
  //   return false;
  // }
 

 canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(next.url[0].path == 'login'){
            if(localStorage.getItem('accessToken')){
                console.log('You are already logged in');
                return false;
            }
            else {
                return true;
            }
        }
        
        if(localStorage.getItem('accessToken')) {
            return true;
        }
        
        console.log('You must be logged in');
        this.router.navigate(['/login']);
        return false;
    }

}
