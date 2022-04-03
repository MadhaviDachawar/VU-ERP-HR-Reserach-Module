import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedmodulesModule } from 'src/app/sharedmodules.module';
import { GeneralizedDashboardComponent } from './generalized-dashboard/generalized-dashboard.component';
import { StaffDashboardComponent } from './generalized-dashboard/staff-dashboard/staff-dashboard.component';
import { StudentDashboardComponent } from './generalized-dashboard/student-dashboard/student-dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    GeneralizedDashboardComponent,
    StaffDashboardComponent,
    StudentDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedmodulesModule,
  ]
})
export class DashboardModule { }