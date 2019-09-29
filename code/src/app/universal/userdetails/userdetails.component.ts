import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

export class DialogData {
  user_id: string;
  password: string;
  user_name: string;
  role: string;
  team_name: string;
  odc: string;
  isDelete: boolean
}

@Component({
  selector: 'app-user-details',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.scss']
})
export class UserdetailsComponent implements OnInit {
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
    const dialogRef = this.dialog.open(UserDetailsDialog, {
      width: '600px',
      height: '500px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.user_id) {
        this.http.post("../addUser/", result).subscribe((res: any) => {
          if (res && res.errno) {
            alert(res.sqlMessage ?res.sqlMessage:'Error Occured');
          }
          else {
            this.fetch();
            alert('Successfully Added');
          }
        });
      }
      console.log('The dialog was closed', result);
    });
  }
  openDeleteDialog(): void {
    let data = new DialogData();
    data.isDelete = true;
    const dialogRef = this.dialog.open(UserDetailsDialog, {
      width: '600px',
      height: '210px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.user_id) {
        this.http.post("../deleteUser/", result).subscribe((res: any) => {
          if (res && res.errno) {
           alert(res.sqlMessage ?res.sqlMessage:'Error Occured');
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
    this.http.get("../users/").subscribe((res: any) => {
      if (res && res.errno) {
        alert(res.sqlMessage ?res.sqlMessage:'Error Occured');
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
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.user_id.toLowerCase().indexOf(val) !== -1 || d.odc.toLowerCase().indexOf(val) !== -1 || d.user_name.toLowerCase().indexOf(val) !== -1 || d.team_name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.mydatatable.offset = 0;
  }
}

@Component({
  selector: 'add-user-dialog',
  templateUrl: 'user-details-dialog.html',
})
export class UserDetailsDialog {

  constructor(
    public dialogRef: MatDialogRef<UserDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}