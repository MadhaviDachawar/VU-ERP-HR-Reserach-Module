import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/common/services/authGuard/auth-guard.service';
import { AccountsComponent } from './accounts.component';
import { FeeStructureComponent } from './fee-structure/fee-structure.component';

const routes: Routes = [{
    path: '',
    component: AccountsComponent,
    children: [
        {
            path: '',
            redirectTo: '/accounts/feestructure',
            pathMatch: 'full'
        },
        {
            path: 'feestructure',
            component: FeeStructureComponent,
            canActivate: [AuthGuardService],
            data: {
                expectedRole: [0, 1, 2, 3, 4, 5]
            }
        },
        { path: '**', redirectTo: '/accounts/feestructure', pathMatch: 'full' },
    ]
}
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountsRoutingModule { }
