import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddCompanyComponent } from './add-company.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCompanyRoutingModule } from './add-company-routing.module';
import { PageHeaderModule } from './../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddCompanyComponent],
  imports: [
    CommonModule,
    AddCompanyRoutingModule,
    PageHeaderModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule

  ]
})
export class AddCompanyModule { }
