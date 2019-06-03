import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TypeInfoComponent } from './type-info.component';

const routes: Routes = [
  {
    path: '', component: TypeInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeInfoRoutingModule { }
