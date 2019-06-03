import { AddComponent } from './add.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRoutingModule } from './add-routing.module';
import { PageHeaderModule } from './../../shared';

@NgModule({
  declarations: [AddComponent],
  imports: [
    CommonModule,
    AddRoutingModule,
    PageHeaderModule
  ]
})
export class AddModule { }
