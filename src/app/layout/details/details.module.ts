import { InformationComponent } from './components/information/information.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PageHeaderModule } from './../../shared/modules/page-header/page-header.module';
import { DetailsComponent } from './details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { NgxGaugeModule } from 'ngx-gauge';
import { SharedPipesModule } from 'src/app/shared';
import { RealtimeComponent, TimeSeriesComponent } from './components';

@NgModule({
  declarations: [
    DetailsComponent,
    RealtimeComponent,
    TimeSeriesComponent,
    InformationComponent,
  
  ],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    PageHeaderModule,
    NgxDatatableModule,
    NgbModule,
    NgxGaugeModule,
    SharedPipesModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class DetailsModule { }
