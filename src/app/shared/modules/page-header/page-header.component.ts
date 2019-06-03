import { Component, OnInit, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Router } from '@angular/router';

@Component({
    selector: 'app-page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
    @Input() heading: string;
    @Input() icon: string;

    myVar: Boolean = false;
    public chars: Array<string> = [];

    constructor(
        private router: Router,
    ) {
        const href = this.router.url;
        this.chars = href.split('/');
        if (this.chars.length > 2) {
            this.myVar = true;
        }
    }

    ngOnInit() {}
}
