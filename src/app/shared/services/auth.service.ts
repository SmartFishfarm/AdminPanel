import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  appUrl = environment.url;
  TOKEN_NAME = 'jwt_token';

  jwtHelper: JwtHelperService;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    ) { }

  login(credentials) {
    return this.http.post(`${this.appUrl}/login`, credentials)
    .pipe(
      tap((res: any) => {
        this.setToken(res['token']);
        this.router.navigate(['/dashboard']);
        return true;
      }),
      catchError(e => {
        if(e.error.message) {
          this.toastr.error(e.error.message, '로그인실패', {
            timeOut: 3000
          });
        } else {
          this.toastr.error("오류가 생겼습니다.", '로그인실패', {
            timeOut: 3000
          });
        }
        throw new Error(e);
        //return of(e);
      })
    );
  }

  signup(credentials) {
    return this.http.post(`${this.appUrl}/signup`, credentials)
    .pipe(
      tap((res: any) => {
        this.router.navigate(['/login']);
        return true;
      }),
      catchError(e => {
        //throw new Error(e);
        return of(e);
      })
    );
  }

  logout(): void {
    this.removeToken();
  }

  // 토큰 유효성 검증
  isAuthenticated(): boolean {
    const token = this.getToken();
    // console.log(token);
    return token ? true : false;
    // return token ? !this.isTokenExpired(token) : false;

  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_NAME, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_NAME);
  }

  /*
  isTokenExpired(token: string) {
    return this.jwtHelper.isTokenExpired(token);
  }
  */

  getUserid(): string {
    return this.jwtHelper.decodeToken(this.getToken()).userid;
  }



}
