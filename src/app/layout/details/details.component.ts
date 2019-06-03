import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageService } from './../../shared/services/manage.service';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ActivatedRoute } from '@angular/router';
import { _ } from 'underscore';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  animations: [routerTransition()],
})
export class DetailsComponent implements OnInit {

  companyId: string;
  title: string;

  constructor(
    private manageService: ManageService,
    private route: ActivatedRoute,
    ) {
      this.companyId = this.route.snapshot.paramMap.get('companyId');
      this.manageService.getCompany(this.companyId).subscribe((res: any) => {
        this.title = res[0].company;
      });
    }

  ngOnInit() {
    
  }


  



  
}
