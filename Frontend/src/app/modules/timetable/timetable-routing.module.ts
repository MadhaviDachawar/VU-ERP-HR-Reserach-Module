import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from 'src/app/common/services/authGuard/auth-guard.service';
import { CreateComponent } from './create/create.component';
import { TimetableComponent } from './timetable.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [{
    path: '',
    component: TimetableComponent,
    children: [
        {
            path: '',
            redirectTo: '/timetable/view',
            pathMatch: 'full'
        },
        {
            path: 'create',
            component: CreateComponent,
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
        { path: '**', redirectTo: '/timetable', pathMatch: 'full' },
    ]
}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TimetableRoutingModule { }
