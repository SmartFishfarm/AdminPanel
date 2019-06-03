import { FormsModule } from '@angular/forms';
import { UsersComponent } from './users.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UsersRoutingModule } from './users-routing.module';
import { PageHeaderModule } from './../../shared';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    PageHeaderModule,
    NgxDatatableModule,
    NgbModule,
    Ng2SearchPipeModule,
    FormsModule

  ],
})
export class UsersModule { }
