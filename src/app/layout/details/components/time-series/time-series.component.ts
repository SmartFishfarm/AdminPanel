import { ActivatedRoute } from '@angular/router';
import { ManageService } from './../../../../shared/services/manage.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-series',
  templateUrl: './time-series.component.html',
  styleUrls: ['./time-series.component.scss']
})
export class TimeSeriesComponent implements OnInit {

  companyId: string;
  analyzers: any;

  selected = new FormControl('');

  rows = [];
  columns = [
    { name: '날짜시간', prop: 'timestamp'},
    { name: '센서타입', prop: 'type'},
    { name: '단위', prop: 'unit'},
    { name: '상태', prop: 'state'},
    { name: '센서값', prop: 'value'},
    { name: '온도', prop: 'temp'},
  ];

  constructor(
    private route: ActivatedRoute,
    private manageService: ManageService,
  ) { }

  ngOnInit() {
    this.companyId = this.route.snapshot.paramMap.get('companyId');
    this.manageService.getAnalyzer(this.companyId).subscribe((analyzer: any) => {
      this.analyzers = analyzer;
    });
  }

  updateTimeSeries() {
    this.manageService.getTimeSeries(this.selected.value)
    .subscribe((res: any) => {
      this.rows = res;
    });
  }

}
