import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimetableRoutingModule } from './timetable-routing.module';
import { TimetableComponent } from './timetable.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { SharedmodulesModule } from 'src/app/sharedmodules.module';

@NgModule({
    declarations: [
        TimetableComponent,
        CreateComponent,
        ViewComponent
    ],
    imports: [
        CommonModule,
        TimetableRoutingModule,
        SharedmodulesModule
    ]
})
export class TimetableModule { }