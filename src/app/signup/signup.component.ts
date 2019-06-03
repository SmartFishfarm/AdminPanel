import { AuthService } from './../shared/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent {

    signupForm: FormGroup;

    constructor(
        private translate: TranslateService,
        private formBuilder: FormBuilder,
        private authService: AuthService,

        ) {
        this.translate.addLangs(['ko', 'en']);
        this.translate.setDefaultLang('ko');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/ko|en/) ? browserLang : 'ko');

        this.signupForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            email: ['', [Validators.required]],
            password: ['', [Validators.required]],
            passchk: ['', [Validators.required]]
          });
    }

    onSubmit() {
        this.authService.signup(this.signupForm.value)
        .subscribe();
    }


}
