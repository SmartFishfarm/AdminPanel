import { ManageService } from './../../shared/services/manage.service';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
  animations: [routerTransition()]
})
export class ManagementComponent implements OnInit {

  companies: any;
  constructor(
    private manageService: ManageService,

  ) { }

  ngOnInit() {
    this.manageService.companyList().subscribe((res: any) => {
      this.companies = res;
    });
  }

}
