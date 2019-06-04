import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ManageService {
  url = environment.url;
  public headers: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    this.headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.auth.getToken());
  }


  dashboard() {

    return this.http.get(`${this.url}/dashboard`, { headers: this.headers }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  getTypeInfo() {
    return this.http.get(`${this.url}/typeinfo`, { headers: this.headers }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  manageUsers() {
    return this.http.get(`${this.url}/users`, { headers: this.headers }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  locService() {
    return this.http.get(`${this.url}/map`, { headers: this.headers }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  /**
   *  회사정보
   * @returns
   * @memberof ManageService
   */
  companyList() {
    /*
    const headers = new HttpHeaders()
    .set('Authorization', this.auth.getToken());
    */
    return this.http.get(`${this.url}/company-list`, { headers: this.headers }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  getCompany(company_id) {
    return this.http.get(`${this.url}/company/` + company_id, { headers: this.headers }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  /**
   *  계측기정보
   * @returns
   * @memberof ManageService
   */
  getAnalyzer(company_id) {
    return this.http.get(`${this.url}/analyzer/` + company_id, { headers: this.headers }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  /**
   *  실시간 정보
   * @returns
   * @memberof ManageService
   */
  getRealtime(company_id) {
    return this.http.get(`${this.url}/realtime/` + company_id, { headers: this.headers }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  /**
   *  시계열 데이터 정보
   * @returns
   * @memberof ManageService
   */
  getTimeSeries(serial_code) {
    const params = new HttpParams()
    .set('serial_code', serial_code);

    return this.http.get(`${this.url}/timeseries`, {headers: this.headers, params: params}).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  verifyState(bool, user_id) {
    return this.http.put(`${this.url}/users/verify/` + user_id, {'bool': bool}, {headers: this.headers}).pipe(
      tap(_ => console.log(`updated id=${user_id}`)),
      catchError(e => {
        this.showAlert();
        throw new Error(e);
      })
    );
  }

  deleteUser(user_id) {
    return this.http.put(`${this.url}/users/delete/` + user_id, { headers: this.headers }).pipe(
      tap(_ => console.log(`updated id=${user_id}`)),
      catchError(e => {
        this.showAlert();
        throw new Error(e);
      })
    );
  }

  /**
   * 회사수정
   */
  editCompany(company_id, crendentials) {
    return this.http.put(`${this.url}/company/` + company_id, crendentials, { headers: this.headers }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        this.showAlert();
        throw new Error(e);
      })
    );
  }


  /**
   * 계측기 수정
   */
  editAnalyzer(sensor_id, crendentials) {
    return this.http.put(`${this.url}/analyzer/${sensor_id}`, crendentials, { headers: this.headers }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        this.showAlert();
        throw new Error(e);
      })
    );
  }


  editTypeInfo(id, crendentials) {
    return this.http.put(`${this.url}/typeinfo/`+ id, crendentials, { headers: this.headers }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        this.showAlert();
        throw new Error(e);
      })
    );
  }


  /**
   * 회사삭제
   * @param company_id
   */
  deleteCompany(company_id) {
    return this.http.delete(`${this.url}/company/` + company_id, { headers: this.headers }).pipe(
      tap(res => {
        this.router.navigate(['/management']);
      }),
      catchError(e => {
        this.showAlert();
        throw new Error(e);
      })
    );
  }


  /**
   * 계측기 삭제
   */
  deleteAnalyzer(sensor_id) {
    return this.http.delete(`${this.url}/analyzer/${sensor_id}`, { headers: this.headers }).pipe(
      tap(res => {
        return res;
      }),
      catchError(e => {
        this.showAlert();
        throw new Error(e);
      })
    );
  }


  showAlert() {
    this.toastr.error('에러가 발생했습니다.', '에러 발생', {
      timeOut: 3000
    });
  }


}
