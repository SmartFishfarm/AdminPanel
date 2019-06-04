import { ActivatedRoute, Router } from '@angular/router';
import { ManageService } from 'src/app/shared/services/manage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  public isCollapsed1: boolean;
  public isCollapsed2: boolean;
  public isCollapsed3: boolean;
  public isCollapsed4: boolean;
  public isCollapsed5: boolean;

  editForm: FormGroup;
  editAnalyzerForm: FormGroup;

  company: any;
  analyzers: any;
  companyId: string;
  comName = '';
  closeResult: string;

  constructor(
    private manageService: ManageService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,


  ) { 
    this.isCollapsed1 = true;
    this.isCollapsed2 = true;
    this.isCollapsed3 = true;
    this.isCollapsed4 = true;
    this.isCollapsed5 = true;
  }

  ngOnInit() {

    this.companyId = this.route.snapshot.paramMap.get('companyId');
    this.manageService.getCompany(this.companyId).subscribe((res: any) => {
      res.forEach(company => {
        this.company = company;
        this.comName = company.company;
      });
    });
    this.manageService.getAnalyzer(this.companyId).subscribe((analyzer: any) => {
      this.analyzers = analyzer;
    });

    this.editForm = this.formBuilder.group({
      company: ['', [Validators.required]],
      address: [''],
    });

    this.editAnalyzerForm = this.formBuilder.group({
      name_tag: ['', [Validators.required]],
    });

  }

  analyzerList() {
    this.isCollapsed3 = !this.isCollapsed3;
  }


  onEdit(id) {
    if (this.editForm.invalid) {
      return;
    }
    this.manageService.editCompany(id, this.editForm.value)
    .subscribe((res: any) => {
      this.toastr.success(res.success, '수정완료', {
        timeOut: 2500
      });
    });
    this.modalService.dismissAll();
  }

  onAnalyzerEdit(id) {
    if (this.editAnalyzerForm.invalid) {
      return;
    }
    this.manageService.editAnalyzer(id, this.editAnalyzerForm.value)
    .subscribe((res: any) => {
      this.toastr.success(res.success, '수정완료', {
        timeOut: 2500
      });
      this.manageService.getAnalyzer(this.companyId).subscribe((analyzer: any) => {
        this.analyzers = analyzer;
      });
    });
    this.modalService.dismissAll();
  }


  onDeleteCompany() {
    this.manageService.deleteCompany(this.companyId)
    .subscribe(
      response => {
        console.log('Success!', response);
        this.toastr.success('회사가 삭제되었습니다.', '회사 삭제', {
          timeOut: 3000
        });
      },
      error => {
        console.error('Error!', error);
      }
    );
    this.modalService.dismissAll();
  }

  onDeleteAnalyzer(id) {
    this.manageService.deleteAnalyzer(id)
    .subscribe((res: any) => {
      this.toastr.success(res.success, '수정완료', {
        timeOut: 2500
      });
      this.manageService.getAnalyzer(this.companyId).subscribe((analyzer: any) => {
        this.analyzers = analyzer;
      });
    });
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
