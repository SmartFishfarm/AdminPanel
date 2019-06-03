import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticRoutingModule } from './statistic-routing.module';
import { PageHeaderModule } from '../../shared';
import { StatisticComponent } from './statistic.component';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

@NgModule({
  declarations: [StatisticComponent],
  imports: [
    CommonModule,
    StatisticRoutingModule,
    PageHeaderModule,
    Ng2Charts
  ]
})
export class StatisticModule { }
