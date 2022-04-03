import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { SharedmodulesModule } from 'src/app/sharedmodules.module';

import { CoreInformationComponent } from './add/core-information/core-information.component';
import { CommunicationDetailsComponent } from './add/communication-details/communication-details.component';
import { QualificationDetailsComponent } from './add/academic-details/qualification-details.component';
import { ExperienceDetailsComponent } from './add/experience-details/experience-details.component';
import { BankingDetailsComponent } from './add/banking-details/banking-details.component';
import { DocumentsComponent } from './add/documents/documents.component';
import { PersonalDetailsComponent } from './add/personal-details/personal-details.component';
import { OtherInformationComponent } from './add/other-information/other-information.component';

@NgModule({
    declarations: [
        StudentComponent,
        AddComponent,
        ViewComponent,
        CoreInformationComponent,
        CommunicationDetailsComponent,
        QualificationDetailsComponent,
        ExperienceDetailsComponent,
        BankingDetailsComponent,
        DocumentsComponent,
        PersonalDetailsComponent,
        OtherInformationComponent,
    ],
    imports: [
        CommonModule,
        StudentRoutingModule,
        SharedmodulesModule
    ],
    bootstrap: [StudentComponent],
})
export class StudentModule { }