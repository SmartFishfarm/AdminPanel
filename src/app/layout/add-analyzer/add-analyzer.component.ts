import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { ManageService } from 'src/app/shared/services/manage.service';
import { RegisterService } from 'src/app/shared/services/register.service';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-analyzer',
  templateUrl: './add-analyzer.component.html',
  styleUrls: ['./add-analyzer.component.scss'],
  animations: [routerTransition()],

})
export class AddAnalyzerComponent implements OnInit {

  analyzerForm: FormGroup;
  companies: any;
  channels: any;
  isDisabled: boolean;

  closeResult: string;

  numbers: Array<number> = [1, 2, 3, 4];

  types: object =
    {'pH' : 'ph' ,
    'DO' : 'do' ,
    'ORP' : 'orp',
    '전기전도도' : 'cd',
    'MLSS' : 'mlss',
    'SS' : 'ss',
    '잔류염소' : 'rc',
    '탁도' : 'tbd',
    'Cl' : 'cl',
    'SD' : 'sd',
    '인덕턴스 농도' : 'cdin'
    };

  constructor(
    private manageService: ManageService,
    private registerService: RegisterService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router,

  ) {
  }

  ngOnInit() {
    this.manageService.companyList().subscribe((res: any) => {
      this.companies = res;
    });

    this.analyzerForm =  this.formBuilder.group({
      company_id: ['', [Validators.required]],
      channel_id: ['', [Validators.required]],
      serial_code: ['', [Validators.required]],
      sensors: this.formBuilder.array([ this.createSensor() ]),
    });

  }

  createSensor(): FormGroup {
    return this.formBuilder.group({
      num : ['', [Validators.required]],
      name_tag: ['', [Validators.required]],
    });
  }


  get formData() {
    return this.analyzerForm.get('sensors') as FormArray;
  }

  addSensor(): void {
    if(this.formData.length <= 3) {
      this.formData.push(this.createSensor());

    }
  }

  deleteSensor(index) {
    this.formData.removeAt(index);
  }

  onSubmit() {
    this.registerService.addAnalyzer(this.analyzerForm.value)
    .subscribe(
      response => {
        console.log('Success!', response);
        this.toastr.success('계측기를 추가했습니다.', '계측기 추가', {
          timeOut: 3000
        });
        setTimeout(()=>{
          this.router.navigate(['/add']);
        }, 1000);
      },
      error => {
        console.error('Error!', error);
        this.toastr.error('서버에 에러가 발생되었습니다.', '에러 발생', {
          timeOut: 3000
        });
      }
    );
    this.modalService.dismissAll();

  }

  channelActive(event) {
    this.manageService.getChannel(event).subscribe((res: any) => {
      this.channels = res;
    });
    this.isDisabled = !this.isDisabled;
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
