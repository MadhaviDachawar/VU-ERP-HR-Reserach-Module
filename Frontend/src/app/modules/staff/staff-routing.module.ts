import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffComponent } from './staff.component';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { AuthGuardService as AuthGuard } from 'src/app/common/services/authGuard/auth-guard.service';

const routes: Routes = [{
    path: '',
    component: StaffComponent,
    children: [
        {
            path: '',
            redirectTo: '/staff/view',
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
                expectedRole: [0, 1, 2, 3, 4, 5],
                mode: "profile"
            },
        },
        { path: '**', redirectTo: '/staff/view', pathMatch: 'full' },
    ]
}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StaffRoutingModule { }
