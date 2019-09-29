import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

export class DialogData {
  emp_id: string;
  emp_name: string;
  asset_type: string;
  asset_id: string;
  floor_num: string;
  seat_num: string;
  source_prjct: string;
  team_name: string;
  multitagged_asset_id: string;
  odc: string;
  isDelete: boolean
}

@Component({
  selector: 'app-odc-details',
  templateUrl: './odc-details.component.html',
  styleUrls: ['./odc-details.component.scss']
})
export class OdcDetailsComponent implements OnInit {
  editing = {};
  rows = [];
  temp = [];
  @ViewChild(DatatableComponent, { static: false }) mydatatable: DatatableComponent;
  constructor(public dialog: MatDialog, private http: HttpClient) {
    this.fetch();
  }

  ngOnInit() {
  }
  openAddDialog(): void {
    let data = new DialogData();
    data.isDelete = false;
    const dialogRef = this.dialog.open(EmployeeDetailsDialog, {
      width: '600px',
      height: '500px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.emp_id) {
        this.http.post("../addEmployee/", result).subscribe((res: any) => {
          if (res && res.errno) {
            alert(res.sqlMessage ? res.sqlMessage : 'Error Occured');
          }
          else {
            this.fetch();
            alert('Successfully Added');
          }
        });
      }
    });
  }
  openDeleteDialog(): void {
    let data = new DialogData();
    data.isDelete = true;
    const dialogRef = this.dialog.open(EmployeeDetailsDialog, {
      width: '600px',
      height: '210px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.emp_id) {
        this.http.post("../deleteEmployee/", result).subscribe((res: any) => {
          if (res && res.errno) {
            alert(res.sqlMessage ? res.sqlMessage : 'Error Occured');
          }
          else {
            this.fetch();
            alert('Deleted Successfully');
          }
        });
      }
      console.log('The dialog was closed', result);
    });
  }
  fetch() {

    this.http.get("../employees/").subscribe((res: any) => {
      if (res && res.errno) {
        alert(res.sqlMessage ? res.sqlMessage : 'Error Occured');
      }
      else {
        // cache our list
        this.temp = [...res];

        // push our inital complete list
        this.rows = res;
      }
    });
  }
  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex)
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
    this.rows[rowIndex].updated_field = cell;
    this.http.post("../updateEmployee/", this.rows[rowIndex]).subscribe((res: any) => {
      if (res && res.errno) {
        alert(res.sqlMessage ? res.sqlMessage : 'Error Occured');
      }
      else {
        console.log("Updated Sucessully");
      }
    });

  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.emp_id.toLowerCase().indexOf(val) !== -1 || d.team_name.toLowerCase().indexOf(val) !== -1 || d.emp_name.toLowerCase().indexOf(val) !== -1 || d.odc.toLowerCase().indexOf(val) !== -1 || d.asset_type.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.mydatatable.offset = 0;
  }
}

@Component({
  selector: 'add-employee-dialog',
  templateUrl: 'employee-details-dialog.html',
})
export class EmployeeDetailsDialog {

  constructor(
    public dialogRef: MatDialogRef<EmployeeDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}