import { Router } from '@angular/router';
import { ManageService } from './../../shared/services/manage.service';

import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [routerTransition()]
})
export class UsersComponent implements OnInit {

  options = [0, 1];

  users: any;
  editing = {};

  closeResult: string;

  searchText: any;

  constructor(
    private manageService: ManageService,
    private toastr: ToastrService,
    private modalService: NgbModal,

    ) {

  }

  ngOnInit() {
    this.manageService.manageUsers().subscribe((users: any) => {
      this.users = users;
    });
  }


  updateValue(event, id) {
    const bool = event.target.value;
    this.manageService.verifyState(bool, id).subscribe((res: any) => {
      if (res.success = 'success') {
        this.toastr.success('인증상태가 변경되었습니다', '변경알림', {
          timeOut: 3000
        });
      }
    });
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

  onDelete(id) {
      this.manageService.deleteUser(id).subscribe((res: any) => {
      if (res.success = 'success') {
        this.toastr.success('삭제 되었습니다', '삭제알림', {
          timeOut: 3000
        });

        this.manageService.manageUsers().subscribe((users: any) => {
          this.users = users;
        });

        //location.reload();
      }
      this.modalService.dismissAll();
    });
  }




}
