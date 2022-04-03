import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from 'src/app/common/services/authGuard/auth-guard.service';
import { StructureComponent } from './structure.component';
import { UniversityStructureComponent } from './university-structure/university-structure.component';
import { SyllabusStructureComponent } from './syllabus-structure/syllabus-structure.component';

const routes: Routes = [{
    path: '',
    component: StructureComponent,
    children: [
        {
            path: '',
            redirectTo: '/structure/universitystructure',
            pathMatch: 'full'
        },
        {
            path: 'universitystructure',
            component: UniversityStructureComponent,
            canActivate: [AuthGuard],
            data: {
                expectedRole: [0, 1, 2, 3, 4, 5]
            }
        },
        {
            path: 'syllabusstructure',
            component: SyllabusStructureComponent,
            canActivate: [AuthGuard],
            data: {
                expectedRole: [0, 1, 2, 3, 4, 5]
            }
        },
        { path: '**', redirectTo: '/structure/universitystructure', pathMatch: 'full' },
    ]
}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StructureRoutingModule { }
