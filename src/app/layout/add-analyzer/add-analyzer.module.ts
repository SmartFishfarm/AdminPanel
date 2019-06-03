import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PageHeaderModule } from './../../shared/modules/page-header/page-header.module';
import { AddAnalyzerComponent } from './add-analyzer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddAnalyzerRoutingModule } from './add-analyzer-routing.module';
import {NumberPickerModule} from 'ng-number-picker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [AddAnalyzerComponent],
  imports: [
    CommonModule,
    AddAnalyzerRoutingModule,
    PageHeaderModule,
    FormsModule,
    ReactiveFormsModule,
    NumberPickerModule,
    NgbModule,
    MatCheckboxModule,
    MatCardModule,

  ]
})
export class AddAnalyzerModule { }
