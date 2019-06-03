import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/shared/services/register.service';
import { routerTransition } from '../../router.animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss'],
  animations: [routerTransition()],

})
export class AddCompanyComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  closeResult: string;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router
    ) {

   }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      company: ['', [Validators.required]],
      address: [''],
      latitude: [''],
      longitude: [''],
    });

  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.registerService.addCompany(this.registerForm.value)
    .subscribe();
    this.modalService.dismissAll();

  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return  `with: ${reason}`;
    }
  }


}
