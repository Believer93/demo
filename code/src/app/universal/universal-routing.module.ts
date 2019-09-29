import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UniversalComponent } from './universal.component';
import { OdcDetailsComponent } from './odc-details/odc-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';

const routes: Routes = [
  {
    path: '', component: UniversalComponent,
    children: [
      { path: '', redirectTo: 'empdetails', pathMatch: 'full' },
      { path: 'empdetails', component: OdcDetailsComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'userdetails', component: UserdetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UniversalRoutingModule { }
