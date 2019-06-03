import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderModule } from './../../shared/modules/page-header/page-header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeInfoRoutingModule } from './type-info-routing.module';
import { TypeInfoComponent } from './type-info.component';
import { FilterPipeModule } from 'ngx-filter-pipe';

@NgModule({
  declarations: [TypeInfoComponent],
  imports: [
    CommonModule,
    TypeInfoRoutingModule,
    PageHeaderModule,
    NgbModule,
    FilterPipeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TypeInfoModule { }
