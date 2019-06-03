import { AuthService } from './../shared/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routerTransition } from '../router.animations';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    credentialsForm: FormGroup;

    constructor(
        private translate: TranslateService,
        public router: Router,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private toastr: ToastrService,

        ) {
            this.translate.addLangs(['ko', 'en']);
            this.translate.setDefaultLang('ko');
            const browserLang = this.translate.getBrowserLang();
            this.translate.use(browserLang.match(/ko|en/) ? browserLang : 'ko');
    }

    ngOnInit() {

        this.credentialsForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
          });
    }

    /*
    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }
    */

    onLoggedin() {
        this.authService.login(this.credentialsForm.value)
        .subscribe(
            /*
            res => {
                console.log(res.error.message);
                this.toastr.success('로그인성공', '로그인성공', {
                    timeOut: 3000
                });
            },
            err => {
                console.log(err);
                this.toastr.error('로그인실패', '에러 발생', {
                    timeOut: 3000
                  });
            }
            */
            );
    }
}
