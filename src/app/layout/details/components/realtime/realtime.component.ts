import { environment } from './../../../../../environments/environment.prod';
import { ManageService } from 'src/app/shared/services/manage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { _ } from 'underscore';

@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.scss']
})
export class RealtimeComponent implements OnInit {

  companyId: string;  
  private interval = null;
  realtimes: any[] = [];

  MSG_OK = environment.msg_ok;
  MSG_NETWORK_ERROR = environment.msg_network_error;
  MSG_CORRECTION = environment.msg_correction;
  MSG_REPLACE = environment.msg_replace;
  MSG_TROUBLE = environment.msg_trouble;
  MSG_CLEAN = environment.msg_clean;

  constructor(
    private manageService: ManageService,
    private route: ActivatedRoute,
  ) { 
    this.companyId = this.route.snapshot.paramMap.get('companyId');
    this.getRealtime();

  }

  ngOnInit() {

  }

  ngAfterViewInit() {

    this.interval = setInterval(() => { 
      this.getRealtime();
    }, 30*1000);
    
  }

  getRealtime() {
    this.manageService.getRealtime(this.companyId).subscribe((realtime: any) => {
      //console.log(realtime);
      this.realtimes[0] = _.where(realtime, {ch_num: 'ch1'});
      this.realtimes[1] = _.where(realtime, {ch_num: 'ch2'});
      this.realtimes[2] = _.where(realtime, {ch_num: 'ch3'});
      this.realtimes[3] = _.where(realtime, {ch_num: 'ch4'});
      this.realtimes[4] = _.where(realtime, {ch_num: 'ch5'});
      this.realtimes[5] = _.where(realtime, {ch_num: 'ch6'});

    });
  }

}
