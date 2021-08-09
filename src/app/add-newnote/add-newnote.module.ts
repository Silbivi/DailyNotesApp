import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewnotePageRoutingModule } from './add-newnote-routing.module';

import { AddNewnotePage } from './add-newnote.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNewnotePageRoutingModule
  ],
  declarations: [AddNewnotePage]
})
export class AddNewnotePageModule {}
