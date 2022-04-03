import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StructureComponent } from './structure.component';

import { SharedmodulesModule } from 'src/app/sharedmodules.module';
import { StructureRoutingModule } from './structure-routing.module';
import { UniversityStructureComponent } from './university-structure/university-structure.component';
import { SyllabusStructureComponent } from './syllabus-structure/syllabus-structure.component';

// DialogBoxes
import { FacultyComponent } from 'src/app/dialogBoxes/structure/faculty/faculty.component';
import { SchoolComponent } from 'src/app/dialogBoxes/structure/school/school.component';
import { DepartmentComponent } from 'src/app/dialogBoxes/structure/department/department.component';
import { ProgrammeComponent } from 'src/app/dialogBoxes/structure/programme/programme.component';
import { ProgrammeDataYearlyComponent } from 'src/app/dialogBoxes/structure/programmedatayearly/programmedatayearly.component';

// app\dialogBoxes\structure\programmedatayearly\programmedatayearly.component.html

@NgModule({
    declarations: [
        StructureComponent,
        UniversityStructureComponent,
        SyllabusStructureComponent,
        FacultyComponent,
        SchoolComponent,
        DepartmentComponent,
        ProgrammeComponent,
        ProgrammeDataYearlyComponent
    ],
    imports: [
        CommonModule,
        SharedmodulesModule,
        StructureRoutingModule
    ]
})
export class StructureModule { }
