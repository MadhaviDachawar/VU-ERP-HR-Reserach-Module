import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudymaterialRoutingModule } from './studymaterial-routing.module';
import { StudymaterialComponent } from './studymaterial.component';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';


@NgModule({
  declarations: [
    StudymaterialComponent,
    ViewComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    StudymaterialRoutingModule
  ]
})
export class StudymaterialModule { }
