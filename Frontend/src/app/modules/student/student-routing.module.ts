import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from '../student/view/view.component';
import { AddComponent } from './add/add.component';
import { StudentComponent } from './student.component';
import { AuthGuardService as AuthGuard } from 'src/app/common/services/authGuard/auth-guard.service';

const routes: Routes = [{
    path: '',
    component: StudentComponent,
    children: [
        {
            path: '',
            redirectTo: '/student/view',
            pathMatch: 'full'
        },
        {
            path: 'add',
            component: AddComponent,
            canActivate: [AuthGuard],
            data: {
                expectedRole: [0, 1, 2, 3, 4, 5]
            }
        },
        {
            path: 'view',
            component: ViewComponent,
            canActivate: [AuthGuard],
            data: {
                expectedRole: [0, 1, 2, 3, 4, 5]
            }
        },
        {
            path: 'profile',
            component: AddComponent,
            canActivate: [AuthGuard],
            data: {
                expectedRole: [6, 7],
                mode: "profile"
            },
        },
        { path: '**', redirectTo: '/student', pathMatch: 'full' },
    ]
}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentRoutingModule { }