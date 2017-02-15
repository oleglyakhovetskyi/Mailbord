import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router, private authService: AuthService) { }

    // canActivate() {
    //     if(this.authService.isLoggedIn()) {
    //       return true;
    //     } else {
    //       this.router.navigate(['/login']);
    //       return false;
    //     }
    // }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('tokenInfo')) {
            // logged in so return true
            return true;
        }
 
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login']);
        return false;
    }
}