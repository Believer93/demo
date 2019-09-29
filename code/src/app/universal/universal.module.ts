import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UniversalComponent } from './universal.component';
import { UniversalRoutingModule } from './universal-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OdcDetailsComponent, EmployeeDetailsDialog } from './odc-details/odc-details.component';
import { UserdetailsComponent, UserDetailsDialog } from './userdetails/userdetails.component';
import { AddEmpComponent } from './add-emp/add-emp.component';
import { AddUserComponent } from './add-user/add-user.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChartsModule } from 'ng2-charts';
import {MatRadioModule} from '@angular/material/radio';



@NgModule({
  declarations: [UniversalComponent, DashboardComponent, OdcDetailsComponent, UserdetailsComponent, AddEmpComponent, AddUserComponent, EmployeeDetailsDialog, UserDetailsDialog],
  imports: [
    CommonModule,
    FormsModule,
    UniversalRoutingModule,
    NgxDatatableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ChartsModule,
    MatRadioModule
  ],
  entryComponents: [EmployeeDetailsDialog, UserDetailsDialog]
})
export class UniversalModule { }
