import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
 
@Injectable()
export class SkipGuard implements CanActivate {
 
    constructor(private router: Router, private authService: AuthService) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        if (!localStorage.getItem('profileInfo')) {
            return true;
        }

        this.router.navigate(['/mailbox/inbox']);
        
        return false;
    }
}