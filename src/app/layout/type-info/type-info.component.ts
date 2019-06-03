import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { ManageService } from 'src/app/shared/services';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-type-info',
  templateUrl: './type-info.component.html',
  styleUrls: ['./type-info.component.scss'],
  animations: [routerTransition()]

})
export class TypeInfoComponent implements OnInit {

  sensors: any;
  searchText: any = { $or: [{type: ''}, {unit: ''}] };

  editForm: FormGroup;
  closeResult: string;

  constructor(
    private manageService: ManageService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,


  ) {
    this.editForm = this.formBuilder.group({
      min: ['', [Validators.required]],
      max: ['', [Validators.required]],
    });

   }

  ngOnInit() {
    this.manageService.getTypeInfo().subscribe((res: any) => {
      this.sensors = res;
    });
  }


  onEdit(id) {
    if (this.editForm.invalid) {
      return;
    }
    this.manageService.editTypeInfo(id, this.editForm.value)
    .subscribe(
      response => {
        console.log('Success!', response);
        this.toastr.success('변경했습니다.', '변경완료', {
          timeOut: 3000
        });
      },
      error => {
        console.error('Error!', error);
      }
    );
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
