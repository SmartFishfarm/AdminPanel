import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url = environment.url;
  public headers: any;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router

  ) {
    this.headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.auth.getToken());
   }

  addCompany(crendentials) {
    return this.http.post(`${this.url}/add-company`, crendentials, {headers: this.headers}).pipe(
      tap(res => {
        this.toastr.success('회사를 추가했습니다.', '회사 추가', {
          timeOut: 3000
        });
        setTimeout(()=>{
          this.router.navigate(['/add']);
        }, 1000);
      }),
      catchError(e => {
        this.toastr.error(e.error.error, '에러 발생', {
          timeOut: 3000
        });
        throw new Error(e);
      })
    );
  }

  /**
   * @memberof ManageService
   * 채널추가 POST요청
   */
  addChannel(credentials) {
    return this.http.post(`${this.url}/add-channel`, credentials, {headers: this.headers}).pipe(
      tap(_ => {
        return true;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  /**
   * @memberof ManageService
   * 계측기추가 POST요청
   */
  addAnalyzer(credentials) {
    return this.http.post(`${this.url}/add-analyzer`, credentials, {headers: this.headers}).pipe(
      tap(_ => {
        return true;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  addSchedule(credentials) {
    return this.http.post(`${this.url}/add-schedule`, credentials, {headers: this.headers}).pipe(
      tap(_ => {
        return true;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }


}


