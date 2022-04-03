import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './common/services/authGuard/auth-guard.service';

// Components
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'resetpassword', component: ResetPasswordComponent },
    {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(mod => mod.DashboardModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'staff',
        loadChildren: () => import('./modules/staff/staff.module').then(mod => mod.StaffModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'staff_NonTeaching',
        loadChildren: () => import('./modules/staff_NonTeaching/staff_NonTeaching.module').then(mod => mod.staffNonTeachingModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'student',
        loadChildren: () => import('./modules/student/student.module').then(mod => mod.StudentModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'structure',
        loadChildren: () => import('./modules/structure/structure.module').then(mod => mod.StructureModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'timetable',
        loadChildren: () => import('./modules/timetable/timetable.module').then(mod => mod.TimetableModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'accounts',
        loadChildren: () => import('./modules/accounts/accounts.module').then(mod => mod.AccountsModule),
        canActivate: [AuthGuard]
    },
    { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }