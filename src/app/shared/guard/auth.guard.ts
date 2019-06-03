import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private auth: AuthService) {}

    canActivate() {

        // 토큰 유효 기간 확인
        if (!this.auth.isAuthenticated()) {
            console.log('invalid token!');
            this.router.navigate(['/login']);
            return false;
        }
        return true;

        /*
        if (localStorage.getItem('isLoggedin')) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
        */
    }
}
