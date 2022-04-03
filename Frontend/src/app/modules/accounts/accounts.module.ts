import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import { FeeStructureComponent } from './fee-structure/fee-structure.component';
import { SharedmodulesModule } from 'src/app/sharedmodules.module';
import { ViewComponent } from './fee-structure/view/view.component';
import { AddComponent } from './fee-structure/add/add.component';


@NgModule({
  declarations: [
    AccountsComponent,
    FeeStructureComponent,
    ViewComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    SharedmodulesModule
  ]
})
export class AccountsModule { }