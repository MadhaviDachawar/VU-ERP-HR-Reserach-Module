import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendenceRoutingModule } from './attendence-routing.module';
import { AttendenceComponent } from './attendence.component';
import { MarkComponent } from './mark/mark.component';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [
    AttendenceComponent,
    MarkComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    AttendenceRoutingModule
  ]
})
export class AttendenceModule { }
