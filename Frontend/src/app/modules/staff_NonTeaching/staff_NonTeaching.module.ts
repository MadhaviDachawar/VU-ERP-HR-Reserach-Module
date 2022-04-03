import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff_NonTeaching-routing.module';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { StaffComponent } from './staff_NonTeaching.component';
import { SharedmodulesModule } from '../../sharedmodules.module';

import { CoreInformationComponent } from './add/core-information/core-information.component';
import { CommunicationDetailsComponent } from './add/communication-details/communication-details.component';
import { QualificationDetailsComponent } from './add/qualification-details/qualification-details.component';
import { BankingDetailsComponent } from './add/banking-details/banking-details.component';
import { DocumentsComponent } from './add/documents/documents.component';
import { PersonalDetailsComponent } from './add/personal-details/personal-details.component';
import { OtherInformationComponent } from './add/other-information/other-information.component';

@NgModule({
    declarations: [
        StaffComponent,
        AddComponent,
        ViewComponent,
        CoreInformationComponent,
        CommunicationDetailsComponent,
        QualificationDetailsComponent,
        BankingDetailsComponent,
        DocumentsComponent,
        PersonalDetailsComponent,
        OtherInformationComponent,
    ],
    imports: [
        CommonModule,
        SharedmodulesModule,
        StaffRoutingModule,
    ],
})

export class staffNonTeachingModule { }