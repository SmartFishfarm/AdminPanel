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
  editChannelForm: FormGroup;
  editAnalyzerForm: FormGroup;
  editScheduleForm: FormGroup;

  company: any;
  channels: any;
  analyzers: any;
  schedules: any;
  companyId: string;
  comName = '';
  closeResult: string;

  months: Array<number> = [1, 3, 6, 9, 12];

  constructor(
    private manageService: ManageService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,


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
    this.manageService.getChannel(this.companyId).subscribe((channel: any) => {
      this.channels = channel;
    });
    this.manageService.getAllSensor(this.companyId).subscribe((analyzer: any) => {
      this.analyzers = analyzer;
    });
    this.manageService.getSchedule(this.companyId).subscribe((schedule: any) => {
      this.schedules = schedule;
    });

    this.editForm = this.formBuilder.group({
      company: ['', [Validators.required]],
      address: [''],
      latitude: [''],
      longitude: ['']
    });

    this.editChannelForm = this.formBuilder.group({
      ch_name: ['', [Validators.required]],
    });

    this.editAnalyzerForm = this.formBuilder.group({
      name_tag: ['', [Validators.required]],
    });

    this.editScheduleForm = this.formBuilder.group({
      rep_term: [''],
      cor_term: [''],
    });

  }

  channelList() {
    this.isCollapsed2 = !this.isCollapsed2;
  }

  analyzerList() {
    this.isCollapsed3 = !this.isCollapsed3;
  }


  scheduleList() {
    this.isCollapsed4 = !this.isCollapsed4;
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

  onChannelEdit(id) {
    if (this.editChannelForm.invalid) {
      return;
    }
    this.manageService.editChannel(id, this.editChannelForm.value)
    .subscribe((res: any) => {
      this.toastr.success(res.success, '수정완료', {
        timeOut: 2500
      });
      this.manageService.getChannel(this.companyId).subscribe((channel: any) => {
        this.channels = channel;
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
      this.manageService.getAllSensor(this.companyId).subscribe((analyzer: any) => {
        this.analyzers = analyzer;
      });
    });
    this.modalService.dismissAll();
  }

  onScheduleEdit(sensor_id) {
    if (this.editScheduleForm.invalid) {
      return;
    }
    this.manageService.editSchedule(sensor_id, this.editScheduleForm.value)
    .subscribe((res: any) => {
      this.toastr.success(res.success, '수정완료', {
        timeOut: 2500
      });
      this.manageService.getSchedule(this.companyId).subscribe((schedule: any) => {
        this.schedules = schedule;
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

  onDeleteChannel(id) {
    this.manageService.deleteChannel(id)
    .subscribe((res: any) => {
      this.toastr.success(res.success, '수정완료', {
        timeOut: 2500
      });
      this.manageService.getChannel(this.companyId).subscribe((channel: any) => {
        this.channels = channel;
      });
    });
    this.modalService.dismissAll();
  }

  onDeleteAnalyzer(id) {
    this.manageService.deleteAnalyzer(id)
    .subscribe((res: any) => {
      this.toastr.success(res.success, '수정완료', {
        timeOut: 2500
      });
      this.manageService.getAllSensor(this.companyId).subscribe((analyzer: any) => {
        this.analyzers = analyzer;
      });
    });
    this.modalService.dismissAll();
  }

  onDeleteSchedule(id) {
    this.manageService.deleteSchedule(id)
    .subscribe((res: any) => {
      this.toastr.success(res.success, '수정완료', {
        timeOut: 2500
      });
      this.manageService.getSchedule(this.companyId).subscribe((schedule: any) => {
        this.schedules = schedule;
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
