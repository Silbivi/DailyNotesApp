import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewnotePage } from './add-newnote.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewnotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewnotePageRoutingModule {}
